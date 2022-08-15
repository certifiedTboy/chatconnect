const Rooms = require("../models/rooms");
const Chat = require("../models/chat");

exports.createRoom = async (req, res) => {
  try {
    const room = await Rooms.create(req.body);
    if (!room) {
      res.status(500).json({ message: "something went wrong" });
    } else {
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find({});
    if (!rooms) {
      res.json(404).json({ message: "No rooms found" });
    } else {
      res.status(200).json(rooms);
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.getSingleRoom = async (req, res) => {
  console.log(req.user.id);
  try {
    const room = await Rooms.findOne({ topic: req.params.topic })
      .populate("Chat")
      .exec();
    if (!room) {
      res.json(404).json({ message: "No rooms found" });
    } else {
      res.status(200).json(room);
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
