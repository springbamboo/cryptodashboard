import express from "express";
import cors from "cors";
import { Role } from "./auth/model";
import dbConfig from "./auth/config";
import mongoose from "mongoose";
import authRoutes from "./auth/routes";
import apiRoutes from "./api/routes";

const app = express();
const corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// application/json
app.use(express.json());

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// DBに接続
mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Succesfully connect to MongoDB");
        init();
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit();
    });

// DB接続後、Role情報がなければRoleを追加する
function init() {
    Role.estimatedDocumentCount({}, (err, count) => {
        if (err || count !== 0) return;
        new Role({ name: "user" }).save((err) => {
            if (err) throw err;
            console.log("added 'user' to roles collection");
        });
        new Role({ name: "admin" }).save((err) => {
            if (err) throw err;
            console.log("added 'admin' to roles collection");
        });
    });
}

app.get("/", (req, res) => {
    res.send("Welcome.");
});

// 認証API
authRoutes(app);

// データ取得API
apiRoutes(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is runnning: http://localhost:${PORT}/`);
});
