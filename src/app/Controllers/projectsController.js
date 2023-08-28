import { v4 } from 'uuid'
import { pool } from '../Config/config.js'

export const getProducts = async (req, res) => {
    try {
        const conn = await pool
        if (conn.connected) {
            const products = await conn.request().execute("uspGetProducts")
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

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const conn = await pool
        if (conn.connected) {
            const products = await conn.request()
                .input("id", id)
                .execute("uspGetProduct")
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
        console.log("here");
        res.status(500).json({ Error: error.message })

    }
}

export const getProductCategory = async (req, res) => {
    try {
        const { category_id } = req.params
        const conn = await pool
        if (conn.connected) {
            const products = await conn.request()
                .input("category_id", category_id)
                .execute("uspGetProductsByCategory")
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

export const createProduct = async (req, res) => {
    try {
        const { name, image, description, price, category_id } = req.body
        const user_id = req.info.id
        console.log(req.body);
        const id = v4()
        const conn = await pool
        if (conn.connected) {
            const result = await conn.request()
                .input("id", id)
                .input("name", name)
                .input("image", image)
                .input("description", description)
                .input("price", price)
                .input("user_id", user_id)
                .input("category_id", category_id)
                .execute("uspCreateProduct")
            if (result.rowsAffected[0] == 0) {
                res.status(500).json({ Error: "products not created" })
            }
            else {
                res.status(200).json({ message: "Product created successifuly" })
            }

        }
        else {
            res.status(500).json({ "message": "error connecting to db" })
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })

    }
}


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const conn = await pool
        if (conn.connected) {
            const products = await conn.request()
                .input("id", id)
                .execute("uspDeleteProduct")
            if (products.rowsAffected[0] == 0) {
                res.json({ Error: "products not deleted" })
            }
            else {
                res.status(203).json({ message: "product deleted successifully" })
            }

        }
        else {
            res.status(500).json({ "message": "error connecting to db" })
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })

    }
}


export const addProductToCart = async (req, res) => {
    try {
        const { product_id } = req.body
        const user_id = req.info.id
        const conn = await pool
        if (conn.connected) {
            const products = await conn.request()
                .input("product_id", product_id)
                .input("user_id", user_id)
                .execute("uspAddItemToCart")
            if (products.rowsAffected[0] == 0) {
                res.json({ Error: "products not added to cart" })
            }
            else {
                res.status(200).json({ message: "added to cart successifully" })
            }

        }
        else {
            res.status(500).json({ "message": "error connecting to db" })
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })

    }
}



export const removeProductFromCart = async (req, res) => {
    try {
        const user_id = req.info.id
        const { product_id } = req.body
        const conn = await pool
        if (conn.connected) {
            const products = await conn.request()
                .input("product_id", product_id)
                .input("user_id", user_id)
                .execute("uspRemoveItemFromCart")
            if (products.rowsAffected[0] == 0) {
                res.json({ Error: "products not removed from cart" })
            }
            else {
                res.status(200).json({ message: "removed from cart successifully" })
            }

        }
        else {
            res.status(500).json({ "message": "error connecting to db" })
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })

    }
}

export const getUserCartItems = async (req, res) => {
    try {
        const user_id  = req.info.id
        console.log(user_id);
        const conn = await pool
        if (conn.connected) {
            const products = await conn.request()
                .input("user_id", user_id)
                .execute("uspGetUserCartItems")
            if (products.rowsAffected[0] == 0) {
                res.json({ message: "no products found", data: products.recordset  })
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