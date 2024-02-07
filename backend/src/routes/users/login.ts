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
            if (req.session.isLogined) {
                res.redirect("/");
                // res.send("이미 로그인");
            } else {
                if (check) {
                    console.log("로그인 성공");

                    req.session.uid = user_id;
                    req.session.isLogined = true;
                    req.session.save(() => {
                        res.json({
                            uid: req.session.uid,
                            isLogined: req.session.isLogined,
                        });
                    });
                } else {
                    console.log("로그인 실패");
                }
            }
        }
    });
};
