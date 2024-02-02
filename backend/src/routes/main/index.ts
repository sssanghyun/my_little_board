let express = require("express");
let router = express.Router();

const home = require("./home");

/* GET home page. */
router.get("/", home.main);

module.exports = router;
