import { Application } from "express";
import { isAdmin, verifyToken } from "../auth/authJwt";
import { adminData, publicData, userData } from "./controller";

export default (app: Application) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/public", publicData);
    app.get("/api/test/user", [verifyToken], userData);
    app.get("/api/test/admin", [verifyToken, isAdmin], adminData);
};
