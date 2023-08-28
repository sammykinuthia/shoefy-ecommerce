import multer from 'multer'
import { Router } from "express";
import { addProductToCart, createProduct, deleteProduct, getProduct, getProductCategory, getProducts, getUserCartItems, removeProductFromCart } from "../Controllers/projectsController.js";
import { userAuth } from "../Middlewares/userMiddleware.js";

export const productsRouter = Router()

// const upload = multer({ dest: './public/data/uploads/' })

productsRouter.get("/", userAuth, getProducts)
productsRouter.get("/:id", userAuth, getProduct)
productsRouter.get("/categories/:category_id", userAuth, getProductCategory)
productsRouter.post("/new", userAuth, createProduct)
productsRouter.delete("/:id", userAuth, deleteProduct)
productsRouter.post("/carts/new", userAuth, addProductToCart)
productsRouter.post("/carts/remove", userAuth, removeProductFromCart)


