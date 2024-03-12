import { Router } from 'express'
import HttpException from '../models/http-exception.model.js'
import {
    createToken,
    registerUser,
    validateUser,
} from '../services/auth.service.js'
import { findUserByEmail } from '../services/user.service.js'

const router = Router()

/**
 * Logout
 * @route {GET} /v1/api/auth/logout
 * @returns  user logout message
 */
router.get('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out' })
})

/**
 * Login
 * @route {POST} /v1/api/auth/login
 * @bodyparam email
 * @bodyparam password
 * @returns  user login message and user data
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new HttpException(400, 'Email and password are required')
        }

        const user = await findUserByEmail(email)

        if (!user) {
            throw new HttpException(401, 'Invalid credentials')
        }

        const isValid = await validateUser(email, password)

        if (!isValid) {
            throw new HttpException(401, 'Invalid credentials')
        }

        const token = createToken({ id: user._id, email: user.email })

        return res
            .status(200)
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            })
            .json({
                message: 'Login successful',
                user: { id: user._id, name: user.name, email: user.email },
            })
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message })
    }
})

/**
 * Register
 * @route {POST} /v1/api/auth/register
 * @bodyparam email
 * @bodyparam password
 * @bodyparam name
 * @returns  user registering message
 */

router.post('/register', (req, res) => {
    try {
        const { email, password, name } = req.body

        if (!email || !password || !name) {
            throw new HttpException(400, 'Email and password are required')
        }
        const userExists = !!findUserByEmail(email).then((user) => user)

        if (userExists) {
            throw new HttpException(400, 'User already exists')
        }

        const createdUser = registerUser(email, password, name)

        if (!createdUser) {
            throw new HttpException(500, 'User not created')
        }

        return res.status(201).json({
            message: 'User registered',
            user: { name: createdUser.name, email: createdUser.email },
        })
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message })
    }
})

export default router
