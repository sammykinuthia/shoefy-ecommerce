
import express from 'express'
import path from 'path'
import { userRouter } from './app/Routers/usersRouter.js'
import { productsRouter } from './app/Routers/productsRouter.js'
import { categoryRouter } from './app/Routers/categoriesRouter.js'
import { cartRouter } from './app/Routers/cartsRouter.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 3030

app.use('/users', userRouter)
app.use('/products', productsRouter)
app.use('/categories', categoryRouter)
app.use('/carts', cartRouter)

app.use('/', express.static(path.join(path.dirname("./public"), 'public')))

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
