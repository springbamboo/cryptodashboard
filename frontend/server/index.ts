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
import log from "./lib/log";

// 環境変数のロード
const DotEnvResult = dotenv.config();
if (DotEnvResult.error) {
    log("warning", ".env not detected");
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
    log("info", "Connecting to MongoDB...");
    try {
        const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_TABLE}?retryWrites=true&w=majority`;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        log("success", "Succesfully connect to MongoDB");
    } catch (err) {
        log("error", "Failed to connect to MongoDB");
        console.log(err);
    }
}

// DB接続後、Role情報がなければRoleを追加する
function initializeDB(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        log("info", "Initializing database...");
        Role.estimatedDocumentCount({}, async (err, count) => {
            if (err) return reject(err);
            if (count !== 0) {
                log("success", "No need for initialization.");
                return resolve();
            }
            Promise.all([
                new Role({ name: "user" })
                    .save()
                    .then(() =>
                        log("info", "Added 'user' to roles collection")
                    ),
                new Role({ name: "admin" })
                    .save()
                    .then(() =>
                        log("info", "Added 'admin' to roles collection")
                    ),
            ])
                .then(() => {
                    log("success", "Succesfully initialize database.");
                    resolve();
                })
                .catch(() => reject());
        });
    });
}

async function initializeHTTPServer() {
    log("info", "Starting HTTP server...");
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
        log(
            "success",
            `Successfully started http server: http://localhost:${PORT}`
        );
    });
}

const app = next({ dev: NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare()
    .then(connectDB)
    .then(initializeDB)
    .then(initializeHTTPServer)
    .then((httpServer) => WebSocketServer(httpServer))
    .catch((err) => {
        log("error", "Failed to start server.");
        console.log(err);
        process.exit(1);
    });
