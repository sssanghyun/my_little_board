import { Request, Response, NextFunction } from "express";

exports.main = (req: Request, res: Response, next: NextFunction) => {
    console.log("세션 ID : " + req.session.uid);
    res.json({ message: "Hello this is home page" });
};
