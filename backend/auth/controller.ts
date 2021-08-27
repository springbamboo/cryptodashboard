import { User, Role, RoleFields } from "./model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { NativeError } from "mongoose";
dotenv.config();

// 登録
export const signup = (req: Request, res: Response) => {
    // 新規ユーザー
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    // 保存
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        // ロール設定
        if (req.body.roles) {
            // ロールが存在する場合
            Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                // @ts-ignore
                user.roles = roles.map((role) => role["_id"]);
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully" });
                });
            });
        } else {
            // ロールが存在しない場合はuserだけ
            Role.findOne(
                { name: "User" },
                (err: NativeError, role: RoleFields) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    // @ts-ignore
                    user.roles = [role["_id"]];
                    user.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({
                            message: "User was registered successfully",
                        });
                    });
                }
            );
        }
    });
};

export const signin = (req: Request, res: Response) => {
    User.findOne({ username: req.body.username })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password ?? ""
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid password",
                });
            }
            const token = jwt.sign(
                { id: user.id },
                process.env.SECRET as jwt.Secret,
                {
                    expiresIn: 86400,
                }
            );
            const authorities = user.roles?.map(
                (role) => "ROLE_" + role.name?.toUpperCase()
            );
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessTolen: token,
            });
        });
};
