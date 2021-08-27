import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { Role, User } from "./model";

dotenv.config();

// ログインしているか。非ログインは401error
export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers["x-access-token"] as string;
    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET as jwt.Secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "unauthorized" });
        }
        req.body.userId = decoded?.id ?? "";
        next();
    });
};

// 管理者権限があるか。なければ403error
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.body.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find({ _id: { $in: [user!.roles] } }, (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            for (const role of roles) {
                if (role.name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin Role!" });
            return;
        });
    });
};
