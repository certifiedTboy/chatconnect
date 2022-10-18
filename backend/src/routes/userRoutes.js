const express = require("express");
const multer = require("multer");
const upload = require("../utils/multer/multer");
const path = require("path");
const {
  getUser,
  getCurrentUser,
  getUserProfile,
  getAllUsers,
  uploadProfilePicture,
  searchUsers,
  getAllProfiles,
  updateUser,
  updateUserAbout,
  commentToAbout,
  reactToAbout,
} = require("../controllers/user.controller");
const requireSignin = require("../middlewares/requireSignIn");

const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "public", "uploads")));

router.get("/users", requireSignin, getAllUsers);
router.get("/users/currentuser", requireSignin, getCurrentUser);
router.get("/user/userprofile/:username", requireSignin, getUserProfile);
router.get("/user/:userId", requireSignin, getUser);
router.get("/search/:searchdata", requireSignin, searchUsers);
router.get("/users/profiles", getAllProfiles);
router.put("/users/profile/update", requireSignin, updateUser);
router.post("/users/profile/about/update", requireSignin, updateUserAbout);
router.post(
  "/users/profile/about/:username/comment",
  requireSignin,
  commentToAbout
);
router.post(
  "/users/profile/about/:username/reaction",
  requireSignin,
  reactToAbout
);

router.put(
  "/user/profile-upload",
  requireSignin,
  upload.single("image"),
  uploadProfilePicture
);

module.exports = router;
