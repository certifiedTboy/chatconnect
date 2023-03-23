const express = require("express");
const requireSignin = require("../middlewares/requireSignIn");
const {aboutInputLength} = require("../middlewares/index")
const {
  createAbout,
  reactToAbout,
  getUserAbout,
} = require("../controllers/post.controller");
const router = express.Router();

router.post("/about", requireSignin, aboutInputLength, createAbout);
router.post("/about/:aboutId", requireSignin, reactToAbout);
router.get("/about/:username", requireSignin, getUserAbout);
module.exports = router;
