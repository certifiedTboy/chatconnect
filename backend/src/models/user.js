const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    trim: true,
  },
  name: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  about: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  hashed_password: {
    type: String,
    require: true,
    trim: true,
  },
  salt: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  //Associated data
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },

  sentRequest: [
    {
      username: { type: String, default: "" },
    },
  ],
  request: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: {
        type: String,
        default: "",
      },
    },
  ],
  friendsList: [
    {
      friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      friendName: { type: String },
      username: { type: String },
      messagingId: {
        type: String,
        required: true,
        unique: false,
      },
    },
  ],

  blockedUsers: [
    {
      friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      friendName: { type: String },
    },
  ],
  // totalRequest: { type: Number, default: 0 },
});

// virtual field
userSchema
  .virtual("password")
  .set(function (password) {
    // create temporary variable called _password
    this._password = password;
    // generate a timestamp
    this.salt = uuidv4();
    // encryptPassword()
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  //encrypt password function
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

const User = mongoose.model("user", userSchema);

module.exports = User;
