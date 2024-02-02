import { QueryError, ResultSetHeader } from "mysql2";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const db = require("../../db/mysql.ts");

exports.login = async (req: Request, res: Response, next: NextFunction) => {
    // email, password를 받아옴
    const { email, password } = req.body;

    let sql = `select user_no, password from user_tb where email="${email}"`;
    await db.query(sql, async function (err: QueryError, result: any) {
        if (err) console.log("query is not excuted: " + err);
        else {
            const user_id = result[0].user_no;
            const hash_password = result[0].password;
            const check = await bcrypt.compare(password, hash_password);

            if (check) {
                console.log(typeof result[0].user_no);

                req.session.uid = user_id;
                console.log(req.session.uid);
                console.log("로그인 성공");
                res.redirect("/");
            } else {
                console.log("로그인 실패");
            }

            // res.send(result);
        }
    });
};
