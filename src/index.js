import express from 'express'
const app = express()
app.use(express.json())
const PORT = 3030

// app.use('/',)

app.listen(()=>{
    console.log(`app listening at http://localhost:${PORT}`);
})