const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const profileSchema = new Schema({
  profilePicture: String,
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    username: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
