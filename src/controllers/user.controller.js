import { Router } from 'express'
// import HttpException from '../models/http-exception.model.js'

import isAuthenticated from '../utils/isAuth.js'

const router = Router()

router.get('/me', isAuthenticated, (req, res) => {
    try {
        return res.status(200).json({ user: req.user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

export default router
