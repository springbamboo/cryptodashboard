import { model, Schema } from "mongoose";

// Roleモデル: UserやAdmin
export interface RoleFields {
    name?: string;
}
const roleFields = {
    name: String,
};
export const Role = model<RoleFields>(
    "Role",
    new Schema<RoleFields>(roleFields)
);

// Userモデル: ユーザー情報
export interface UserFields {
    username?: string;
    email?: string;
    password?: string;
    roles?: RoleFields[];
}
const userFields = {
    username: String,
    email: String,
    password: String,
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
};
export const User = model<UserFields>(
    "User",
    new Schema<UserFields>(userFields)
);

export const ROLES = ["user", "admin"];
