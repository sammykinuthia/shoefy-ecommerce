import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const userAuth = async (req, res, next) => {
    try {
        const token = req.headers['token']
        if (!token) {
            return res.status(401).json({ "message": "token not provided" })

        }
        const decordedUser = jwt.verify(token, process.env.SECRET)
        req.info = decordedUser


    } catch (error) {
        return res.status(401).json(error)
    }
    next()
}