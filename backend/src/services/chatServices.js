const Rooms = require("../models/rooms")
const User = require("../models/user")

exports.checkThatRoomExist = async (topic) => {
    try {
        const room = await Rooms.findOne({ topic }).populate("Chat").exec()
        if (room) {
            return room
        }

        throw new Error("invalid messaging id")
    } catch (error) {

    }
}


exports.checkThatMessageIdExist = async (topic, userId) => {
    try {
        const user = await User.findById(userId)
        if (user) {
            const messageIdExist = user.friendsList.map((friend) => {
                return friend.messagingId === topic
            })
            return messageIdExist
        } else {

            return ({ message: "something went wrong" })
        }

    } catch (error) {
        return error
    }
}

exports.getOtherUserProfilePicture = async (currentUsername, topic) => {
    try {
        const room = await Rooms.findOne({ topic }).populate("Chat").exec()
        if (room) {
            const Chat = room.Chat

            const otherRoomUser = Chat.find((chat) => {
                if (chat.sender !== currentUsername) {
                    return chat.sender
                }
            })
            return otherRoomUser.sender
            //   return currentRoomUser
        }
    } catch (error) {

    }
}
