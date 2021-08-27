import { ROLES, User } from "./model";
import { Request, Response, NextFunction } from "express";

export const checkDuplicateUsernameOrEmail = (req: Request, res: Response, next: NextFunction) => {
    // username
    User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({
                message: "ユーザー名は既に使われています。",
            });
            return;
        }
    });

    // email
    User.findOne({
        email: req.body.email,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({
                message: "メールアドレスは既に使われています。",
            });
            return;
        }
        next();
    });
};

export const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.roles) return;
    for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
            res.status(400).send({
                message: "Invalid role.",
            });
        }
    }
    next();
};