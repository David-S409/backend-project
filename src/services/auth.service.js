import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import User from '../models/user.model.js'
import HttpException from '../models/http-exception.model.js'

dotenv.config()

const validateUser = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('User not found')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        throw new Error('Invalid password')
    }
    return user
}

const createToken = (user) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1d',
    })
    return token
}
const registerUser = async (email, password, name) => {
    let user = null
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({ email, password: hashedPassword, name })
    } catch (error) {
        throw new HttpException(500, error.message)
    }
    return user
}

export { validateUser, createToken, registerUser }
