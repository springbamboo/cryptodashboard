import { User, Role, RoleFields } from "./model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { NativeError } from "mongoose";

// 新規登録API
export default (req: Request, res: Response) => {
    // 新規ユーザー
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    // DBに保存
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
            // ロールの要求が存在しない場合はuserだけ付与
            Role.findOne(
                { name: "user" },
                (err: NativeError, role: RoleFields) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    // Userロールのidだけを代入
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
