import { Application } from "express";
import signin from "./signin";
import signup from "./signup";
import {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
} from "./verifySignUp";

export default (app: Application) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // 新規登録API
    app.post(
        "/api/auth/signup",
        [checkDuplicateUsernameOrEmail, checkRolesExisted],
        signup
    );
    // ログインAPI
    app.post("/api/auth/signin", signin);
};
