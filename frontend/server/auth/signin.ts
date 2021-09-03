import { User } from "./model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ログインAPI
export default (req: Request, res: Response) => {
    // ユーザー名から検索
    User.findOne({ username: req.body.username })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            // ユーザー存在チェック
            if (!user) {
                res.status(404).send({ message: "User not found" });
                return;
            }

            // パスワードチェック
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password ?? ""
            );
            if (!passwordIsValid) {
                res.status(401).send({
                    accessToken: null,
                    message: "Invalid password",
                });
                return;
            }

            // JWTトークン
            const token = jwt.sign(
                { id: user.id },
                process.env.SECRET as jwt.Secret,
                {
                    expiresIn: 86400, // 24h
                }
            );

            // ロール取得
            const authorities = user.roles?.map(
                (role) => "ROLE_" + role.name?.toUpperCase()
            );

            // レスポンス
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
            });
        });
};
