import { Router } from "express";
import { addProductToCart, createProduct, deleteProduct, getProduct, getProductCategory, getProducts, getUserCartItems, removeProductFromCart } from "../Controllers/projectsController.js";
import { userAuth } from "../Middlewares/userMiddleware.js";
import { upload } from "../Middlewares/fileParse.js";

export const projectsRouter = Router()

projectsRouter.get("/",userAuth,getProducts)
projectsRouter.get("/id:",userAuth,getProduct)
projectsRouter.get("/categories/category_id:",userAuth,getProductCategory)
projectsRouter.post("/new",userAuth,upload.single("image") ,createProduct)
projectsRouter.delete("/id:",userAuth,deleteProduct)
projectsRouter.post("/cart/new",userAuth,addProductToCart)
projectsRouter.post("/cart/remove",userAuth,removeProductFromCart)
projectsRouter.get("/cart/user_id:",userAuth,getUserCartItems)


