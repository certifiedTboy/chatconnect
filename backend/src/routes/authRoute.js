const express = require("express");
const { signup, signin, signout } = require("../controllers/auth.controller");
const { userById } = require("../controllers/user.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.param("userId", userById);

module.exports = router;
