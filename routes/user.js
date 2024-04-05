const express = require("express");
const router = express.Router();
const { handleUserLogin } = require("../controller/user");
const { handleUserSignUp } = require("../controller/user");
router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);
module.exports = router;
