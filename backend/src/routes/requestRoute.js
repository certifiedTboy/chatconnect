const express = require("express");
const { requireSignin } = require("../controllers/auth.controller");
const {
  sendRequest,
  acceptRequest,
  cancelRequest,
  blockUser,
} = require("../controllers/request.controller");
const router = express.Router();

router.post("/user/requests", requireSignin, sendRequest);
router.post("/user/requests/acceptrequest", requireSignin, acceptRequest);
router.post("/user/request/cancelrequest", requireSignin, cancelRequest);
router.post("/user/blocked", blockUser);

module.exports = router;
