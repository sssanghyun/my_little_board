import { ResultSetHeader, QueryError } from "mysql2";
import { Request, Response, NextFunction } from "express";

const db = require("../../db/mysql.ts");

exports.findAll = async (req: Request, res: Response, next: NextFunction) => {
    console.log("find all req.session.uid = " + req.session.uid);
    let sql =
        "select post_tb.*, user_tb.name as name from post_tb left outer join user_tb on post_tb.writer_id = user_tb.user_no";
    await db.query(sql, function (err: QueryError, results: ResultSetHeader) {
        if (err) console.log("query is not excuted: " + err);
        else {
            res.json({ results: results });
        }
    });
};

exports.register = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session.isLogined);
    if (!req.session.isLogined) {
        res.redirect("http://localhost:3000/users/login");
    } else {
        const { title, content } = req.body;
        var sql =
            "INSERT INTO post_tb (title, content, writer_id) VALUES (?, ?, ?)";
        await db.query(
            sql,
            [title, content, req.session.uid],
            function (err: QueryError, result: ResultSetHeader) {
                if (err) console.log("query is not excuted: " + err);
                else {
                    res.redirect(
                        "http://localhost:3000/posts/" + result.insertId
                    );
                }
            }
        );
    }
};

exports.findOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let sql = `select post_tb.*, user_tb.name as name from post_tb left outer join user_tb on post_tb.writer_id = user_tb.user_no where id=${id}`;
    await db.query(sql, function (err: QueryError, result: ResultSetHeader) {
        if (err) console.log("query is not excuted: " + err);
        else res.json({ result: result });
    });
};

exports.modify = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content, writer_id } = req.body;

    let sql = `update post_tb set title=?, content=?, writer_id=? where id=${id}`;
    await db.query(
        sql,
        [title, content, writer_id],
        function (err: QueryError, result: ResultSetHeader) {
            if (err) console.log("query is not excuted: " + err);
            else {
                console.log("수정완료" + result);
                res.send(result);
            }
        }
    );
};

exports.delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let sql = `delete from post_tb where id=${id}`;
    await db.query(sql, function (err: QueryError, result: ResultSetHeader) {
        if (err) console.log("query is not excuted: " + err);
        else {
            console.log("삭제완료" + result);
            res.send(result);
        }
    });
};
