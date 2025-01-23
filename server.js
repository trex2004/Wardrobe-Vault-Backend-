import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoConnection.js'
import connectCloud from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoute.js'

//config
const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloud()

//middlewares
app.use(express.json())
app.use(cors())

//endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get('/',(req,res) => {
    res.send('Server Hello')
})

app.listen(port, () => console.log('Server running on port ',port))