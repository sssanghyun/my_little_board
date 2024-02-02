import { ResultSetHeader, QueryError } from "mysql2";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const db = require("../../db/mysql.ts");

exports.signup = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    console.log(email, ",", password, ",", name);
    const saltRounds = 10;
    try {
        // bcrypt로 비밀번호 암호화 하기
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        var sql =
            "INSERT INTO user_tb (email, password, name) VALUES (?, ?, ?)";
        await db.query(
            sql,
            [email, hash, name],
            function (err: QueryError, result: ResultSetHeader) {
                if (err) console.log("query is not excuted: " + err);
                else {
                    res.redirect("/users/login");
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
};
