import { v4 } from 'uuid'
import { pool } from '../Config/config.js'

export const getCategories = async (req, res) => {
    try {
        const conn = await pool
        if (conn.connected) {
            const products = await conn.request()
                .execute("uspGetCategories")
            if (products.rowsAffected[0] == 0) {
                res.json({ Error: "No products found" })
            }
            else {
                res.status(200).json({ data: products.recordset })
            }

        }
        else {
            res.status(500).json({ "message": "error connecting to db" })
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })

    }
}

export const getCategory = async (req, res) => {
    try {
        const conn = await pool
        const { id } = req.body
        if (conn.connected) {
            const products = await conn.request()
                .input("id", id)
                .execute("uspGetCategory")
            if (products.rowsAffected[0] == 0) {
                res.status(404).json({ Error: "No category found" })
            }
            else {
                res.status(200).json({ data: products.recordset })
            }

        }
        else {
            res.status(500).json({ "message": "error connecting to db" })
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })

    }
}


export const createCategory = async (req, res) => {
    try {
        const conn = await pool
        const { name } = req.body
        const id = v4()
        if (conn.connected) {
            const products = await conn.request()
                .input("id", id)
                .input("name",name)
                .execute("uspCreateCategory")
            if (products.rowsAffected[0] == 0) {
                res.json({ Error: "category not created" })
            }
            else {
                res.status(200).json({ message: "catefory created successifully" })
            }

        }
        else {
            res.status(500).json({ "message": "error connecting to db" })
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })

    }
}