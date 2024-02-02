import { Request, Response, NextFunction } from "express";

exports.logout = (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello this is /logout" });
};
