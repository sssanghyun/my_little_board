const express = require("express");
const router = express.Router();

const main = require("./main/index");
const posts = require("./posts/index");
const users = require("./users/index");

router.use("/", main);
router.use("/posts", posts);
router.use("/users", users);

module.exports = router;
