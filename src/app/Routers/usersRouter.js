import { Router } from "express";
import { registerUser,loginUser, resetPassword,verifyCode, changePassword, verifyUser} from "../Controllers/usersController.js";
import { userAuth } from "../Middlewares/userMiddleware.js";
export const userRouter = Router()


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/reset',resetPassword)
userRouter.post('/verifycode',verifyCode)
userRouter.post('/changepwd',changePassword)
userRouter.post('/verifyuser', userAuth,verifyUser)