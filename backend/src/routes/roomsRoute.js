const express = require("express");
const {
  CreateRoom,
  getAllRooms,
  getSingleRoom,
} = require("../controllers/room.controller");
const requireSignin = require("../middlewares/requireSignIn");
const router = express.Router();

// CreateRoom();

router.get("/rooms", requireSignin, getAllRooms);
router.get("/rooms/:topic", requireSignin, getSingleRoom);

module.exports = router;
