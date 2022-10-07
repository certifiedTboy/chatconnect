const express = require("express");
const requireSignin = require("../middlewares/requireSignIn");
const {
  sendRequest,
  acceptRequest,
  cancelRequest,
  blockUser,
  removeFriend,
  getAllUserFriends,
  getSentRequest,
} = require("../controllers/request.controller");
const router = express.Router();

router.get(
  "/user/request/:username/allFriends",
  requireSignin,
  getAllUserFriends
);
router.get(
  "/user/request/:username/sentrequests",
  requireSignin,
  getSentRequest
);
router.post("/user/requests", requireSignin, sendRequest);
router.post("/user/requests/acceptrequest", requireSignin, acceptRequest);
router.post("/user/requests/cancelrequest", requireSignin, cancelRequest);
router.post("/user/requests/blockuser", requireSignin, blockUser);
router.post("/user/requests/removefriend", requireSignin, removeFriend);

module.exports = router;
