import { Router } from "express";
import { userAuth } from "../Middlewares/userMiddleware.js";
import { addProductToCart, getUserCartItems, removeProductFromCart } from "../Controllers/projectsController.js";

export const cartRouter = Router()
cartRouter.get('/',userAuth,getUserCartItems)
cartRouter.post("/new", userAuth, addProductToCart)
cartRouter.post("/remove", userAuth, removeProductFromCart)
