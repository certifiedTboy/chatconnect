const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roomSchema = new Schema({
  topic: String,
  description: String,
  imgpath: String,
  type: String,
  Chat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
