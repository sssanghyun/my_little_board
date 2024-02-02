let express = require("express");
import { Request, Response, NextFunction } from "express";

let router = express.Router();

const main = require("./main");

router.get("/", main.findAll);

router.post("/", main.register);

/**
 * 특정 게시글의 정보를 받아온다.
 *
 * @param id - 게시글의 id
 */
router.get("/:id", main.findOne);

/**
 * 특정 게시글의 정보를 수정한다.
 *
 * @param id - 게시글의 id
 */
router.put("/:id", main.modify);

/**
 * 특정 게시글의 정보를 삭제한다.
 *
 * @param id - 게시글의 id
 */
router.delete("/:id", main.delete);

module.exports = router;
