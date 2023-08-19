import express from 'express'
import path from 'path'
import { userRouter } from './app/Routers/usersRouter.js'
import { projectsRouter } from './app/Routers/productsRouter.js'
const app = express()
app.use(express.json())
const PORT = 3030

app.use('/users',userRouter)
app.use('/products',projectsRouter)


app.use('/',express.static(path.join(path.dirname("./public"),'public')))


app.listen(PORT,()=>{
    console.log(`app listening at http://localhost:${PORT}`);
})