let express = require("express");
let router = express.Router();

const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");

router.post("/signup", signup.signup);
router.post("/login", login.login);
router.get("/logout", logout.logout);

module.exports = router;
