const express = require("express");
const {
  getAllRooms, getSingleRoom, getRoomData
} = require("../controllers/room.controller");
const requireSignin = require("../middlewares/requireSignIn");
const router = express.Router();

// CreateRoom();

router.get("/rooms", requireSignin, getAllRooms);
router.get("/room/room-data/:topic", requireSignin, getRoomData);
router.get("/rooms/:topic", requireSignin, getSingleRoom);



module.exports = router;
