import User from '../models/user.model.js'

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email })
    return user
}

const findUserByID = async (id) => {
    const user = await User.findById(id)
    return user
}

export { findUserByEmail, findUserByID }
