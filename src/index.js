import express from "express";
import path from "path";

import cors from "cors";
import bodyParser from "body-parser";

import { userRouter } from "./app/Routers/usersRouter.js";
import { projectsRouter } from "./app/Routers/productsRouter.js";
import { categoryRouter } from "./app/Routers/categoriesRouter.js";
const app = express();
app.use(express.json());
const PORT = 3031;

app.use("/users", userRouter);
app.use("/products", projectsRouter);
app.use("/categories", categoryRouter);

app.use("/", express.static(path.join(path.dirname("./public"), "public")));

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
