const mongoose = require("mongoose");

// const crypto = require("crypto");

// const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
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
    isPrivate: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    //Associated data
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },

    about: {
      text: String,
      aboutId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
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
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
