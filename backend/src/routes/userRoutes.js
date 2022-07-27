const express = require("express");
const multer = require("multer");
const upload = require("../utils/multer/multer");
const path = require("path");
const {
  userById,
  getUser,
  getUserProfile,
  getAllUsers,
  uploadProfilePicture,
  searchUsers,
  getAllProfiles,
} = require("../controllers/user.controller");
const { requireSignin } = require("../controllers/auth.controller");

const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "public", "uploads")));

router.get("/users", requireSignin, getAllUsers);
router.get("/user/:userId", requireSignin, getUser);
router.get("/user/userprofile/:username", requireSignin, getUserProfile);
router.get("/search/:searchdata", requireSignin, searchUsers);
router.get("/users/profiles", getAllProfiles);

router.put(
  "/user/profile-upload/:username",
  upload.single("image"),
  uploadProfilePicture
);

router.param("userId", userById);

module.exports = router;
