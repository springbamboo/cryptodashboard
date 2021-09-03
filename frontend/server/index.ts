export {};
import express from "express";
import cors from "cors";
import { Role } from "./auth/model";
import next from "next";
import authRoutes from "./auth/routes";
import apiRoutes from "./api/routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import WebSocketServer from "./exchange/controll";

// 環境変数のロード
const DotEnvResult = dotenv.config();
if (DotEnvResult.error) {
    console.log(".env not detected");
}
const {
    NODE_ENV,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_TABLE,
    PORT = 3000,
} = process.env;

// 認証用DBへ接続
async function connectDB(): Promise<void> {
    try {
        const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_TABLE}?retryWrites=true&w=majority`;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Succesfully connect to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

// DB接続後、Role情報がなければRoleを追加する
function initializeDB(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        Role.estimatedDocumentCount({}, async (err, count) => {
            if (err) return reject(err);
            if (count !== 0) return resolve();
            Promise.all([
                new Role({ name: "user" })
                    .save()
                    .then(() =>
                        console.log("added 'user' to roles collection")
                    ),
                new Role({ name: "admin" })
                    .save()
                    .then(() =>
                        console.log("added 'admin' to roles collection")
                    ),
            ])
                .then(() => resolve())
                .catch(() => reject());
        });
    });
}

async function initializeHTTPServer() {
    const server = express();
    // CORS
    const corsOptions = {
        origin: "http://localhost:3000",
    };
    server.use(cors(corsOptions));
    // application/json
    server.use(express.json());
    // application/x-www-form-urlencoded
    server.use(express.urlencoded({ extended: true }));

    // express側のAPIルーティング
    // Nextjsより先に設定する
    apiRoutes(server);
    authRoutes(server);

    // Nextjs側のルーティング
    server.all("*", (req, res) => {
        return handle(req, res);
    });

    return server.listen(PORT, () => {
        console.log(`Started server: http://localhost:${PORT}`);
    });
}

const app = next({ dev: NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare()
    .then(connectDB)
    .then(initializeDB)
    .then(initializeHTTPServer)
    .then((httpServer) => WebSocketServer(httpServer))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
