import { Application } from "express";
import { signin, signup } from "./controller";
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
    app.post(
        "/api/auth/signup",
        [checkDuplicateUsernameOrEmail, checkRolesExisted],
        signup
    );

    app.post("/api/auth/signin", signin);
};
