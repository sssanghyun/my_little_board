import { ResultSetHeader, QueryError } from "mysql2";
import { Request, Response, NextFunction } from "express";

const db = require("../../db/mysql.ts");

exports.findAll = async (req: Request, res: Response, next: NextFunction) => {
    let sql = "select * from post_tb";
    await db.query(sql, function (err: QueryError, result: ResultSetHeader) {
        if (err) console.log("query is not excuted: " + err);
        else res.send(result);
    });
};

// 로그인 기능 구현한 후 세션 정보로 게시글 작성자도 같이 보내줘야함.
exports.register = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, writer_id } = req.body;
    console.log(title, ",", content, ",", writer_id);
    var sql =
        "INSERT INTO post_tb (title, content, writer_id) VALUES (?, ?, ?)";
    await db.query(
        sql,
        [title, content, writer_id],
        function (err: QueryError, result: ResultSetHeader) {
            if (err) console.log("query is not excuted: " + err);
            else {
                res.redirect("/posts/" + result.insertId);
            }
        }
    );
};

exports.findOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let sql = `select * from post_tb where id=${id}`;
    await db.query(sql, function (err: QueryError, result: ResultSetHeader) {
        if (err) console.log("query is not excuted: " + err);
        else res.send(result);
    });
};

// 로그인 기능 구현한 후 세션 정보로 게시글 작성자도 같이 보내줘야함.
exports.modify = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content, writer_id } = req.body;
    console.log(title, ",", content, ",", writer_id);

    let sql = `update post_tb set title=?, content=?, writer_id=? where id=${id}`;
    // let sql = `select * from post_tb where id=${id}`;
    await db.query(
        sql,
        [title, content, writer_id],
        function (err: QueryError, result: ResultSetHeader) {
            if (err) console.log("query is not excuted: " + err);
            else res.send(result);
        }
    );
};

exports.delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let sql = `delete from post_tb where id=${id}`;
    await db.query(sql, function (err: QueryError, result: ResultSetHeader) {
        if (err) console.log("query is not excuted: " + err);
        else res.send(result);
    });
};
