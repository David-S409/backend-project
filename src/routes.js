import { Router } from 'express'
import authController from './controllers/auth.controller.js'
import userController from './controllers/user.controller.js'

const router = Router()

router.use('/auth', authController)
router.use('/user', userController)

export default Router().use(router)
