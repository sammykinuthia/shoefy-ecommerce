import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import jwt from 'jsonwebtoken'
import {pool} from '../Config/config.js'

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const id = v4()
        const hashPwd = await bcrypt.hash(password, 4)
        const conn = await pool
        if (conn.connected) {
            const result = await conn.request()
                .input("id", id)
                .input("username", username)
                .input("email", email)
                .input("password", hashPwd)
                .execute("uspRegisterUser")
            if (result.rowsAffected[0] == 0) {
                res.json({ Error: "error creating user" })
            }
            else {
                const token = jwt.sign({ username, email, id }, process.env.SECRET, { expiresIn: "4h" })
                res.status(201).json({ message: "Register success", token })
            }
        }
        else {
            res.status(500).json({ "message": "error connecting to db" })
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const conn = await pool
        if (conn.connected) {
            const user = await conn.request()
                .input("email", email)
                .execute("uspGetUser")
            if (user.rowsAffected[0] == 0) {
                res.json({ Error: " user can not be found" })
            }
            else {
                const { username, password: hashedPwd, email, id } = user.recordset[0]
                const result = await bcrypt.compare(password, hashedPwd)
                if (result) {
                    const token = jwt.sign({ username, email, id }, process.env.SECRET, { expiresIn: "4h" })
                    res.status(200).json({ message: "Login success", token })
                }
                else {
                    res.status(403).json({ message: "wrong password" })

                }
            }
        }
        else {
            res.status(500).json({ "message": "error connecting to db" })
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })
    }
}



export const resetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const conn = await pool
        if (conn.connected) {
            const code = v4().slice(0, 6)
            const user = await conn.request()
                .input("email", email)
                .execute("uspGetUser")
            if (user.rowsAffected[0] == 0) {
                res.status(404).json({ message: "email not found" })
            }
            else {
                const { id } = user.recordset[0]
                const result = await conn.request()
                    .input("id", id)
                    .input("code", code)
                    .execute("uspSaveResetCode")
                if (result.rowsAffected[0] == 0) {
                    res.status(500).json({ message: "code could not be saved" })
                }
                else {
                    res.status(200).json({ message: "ok" })
                }

            }

        }
        else {
            res.status(500).json({ error: "error connecting to db" })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



export const verifyCode = async (req, res) => {
    try {
        const { code, email } = req.body
        const conn = await pool
        if (conn.connected) {
            const user = await conn.request()
                .input("email", email)
                .execute("uspGetUser")
            if (user.rowsAffected[0] == 0) {
                res.status(404).json({ message: "email not found" })
            }
            else {
                const { id } = user.recordset[0]
                const result = await conn.request()
                    .input("id", id)
                    .input("code", code)
                    .execute("uspSaveResetCode")
                if (result.rowsAffected[0] == 0) {
                    res.status(500).json({ message: "code could not be saved" })
                }
                else {
                    res.status(200).json({ message: "Code verified"})
                }
            }
        }
        else {
            res.status(500).json({ error: "error connecting to db" })

        }

    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

export const changePassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const conn = await pool
        if (conn.connected) {
            const hashedPwd = await bcrypt.hash(password, 4)
            const result = await conn.request()
                .input("email", email)
                .input("password", hashedPwd)
                .execute("uspChangePassword")
            if (result.rowsAffected[0] == 0) {
                res.status(500).json({ message: "Password could not be updated" })
            }
            else {
                res.status(200).json({ message: "Password Updated successifully" })
            }
        }
        else {
            res.status(500).json({ error: "error connecting to db" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const verifyUser = async(req,res)=>{
    try {
        if(req.info){
            res.status(200).json(req.info)
        }
        else{
            res.status(401).json({message:"token not found"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}