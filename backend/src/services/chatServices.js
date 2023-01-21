const Rooms = require("../models/rooms")
const User = require("../models/user")



exports.checkThatRoomExist = async (topic) => {
    try {
        const room = await Rooms.findOne({ topic }).populate("Chat").exec()
        if (room) {

            return room
        }

        return ({ message: "invalid messaging id" })
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

            return res.status(400).json({ message: "something went wrong" })
        }

    } catch (error) {
        return error
    }
}
