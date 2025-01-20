import express from 'express'
import { adminLoginController, loginController, registrationController } from '../controllers/userController.js'

const userRouter = express.Router()

//routes

//login user
userRouter.post('/login', loginController)

//register user
userRouter.post('/register', registrationController)

//admin login
userRouter.post('/admin', adminLoginController)

export default userRouter