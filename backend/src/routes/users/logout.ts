import { Request, Response, NextFunction } from "express";

exports.logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session.destroy((err) => {
            if (err) console.log(err);
            else {
                console.log("로그아웃");
                res.send('console.log("로그아웃")');
            }
        });
    } catch (e) {
        console.log(e);
    }
};
