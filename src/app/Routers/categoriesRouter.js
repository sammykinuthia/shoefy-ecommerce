import { Router } from "express";
import { createCategory, getCategories, getCategory } from "../Controllers/categoryController.js";
import { userAuth } from "../Middlewares/userMiddleware.js";

export const categoryRouter = Router()

categoryRouter.get("/",userAuth,getCategories)
categoryRouter.post("/",userAuth,getCategory)
categoryRouter.post("/new",userAuth,createCategory)