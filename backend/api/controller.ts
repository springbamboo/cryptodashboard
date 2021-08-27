import { Request, Response } from "express";

export const publicData = (req: Request, res: Response) => {
    res.status(200).send("public content");
};

export const userData = (req: Request, res: Response) => {
    res.status(200).send("only user can access this message");
};

export const adminData = (req: Request, res: Response) => {
    res.status(200).send("only admin can access this message");
};
