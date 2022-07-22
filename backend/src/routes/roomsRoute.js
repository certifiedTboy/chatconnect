const express = require("express");
const { requireSignin } = require("../controllers/auth.controller");
const {
  CreateRoom,
  getAllRooms,
  getRoomById,
} = require("../controllers/room.controller");
const router = express.Router();

// CreateRoom();

router.get("/rooms", requireSignin, getAllRooms);
router.get("/rooms/:topic", requireSignin, getRoomById);

module.exports = router;
