const User = require("../models/user")


const checkThatUserExist = async (username) => {
    try {
        const user = await User.findOne({ username })

        return user

    } catch (error) {
        throw new Error("something went wrong")
    }
}




module.exports = {
    checkThatUserExist
}