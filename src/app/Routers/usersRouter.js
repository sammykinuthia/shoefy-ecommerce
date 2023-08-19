import { Router } from "express";
import { registerUser,loginUser, resetPassword,verifyCode, changePassword} from "../Controllers/usersController.js";
export const userRouter = Router()


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/reset',resetPassword)
userRouter.post('/verifycode',verifyCode)
userRouter.post('/changepwd',changePassword)