import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoConnection.js'
import connectCloud from './config/cloudinary.js'

const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloud()

app.use(express.json())
app.use(cors())

app.get('/',(req,res) => {
    res.send('Server Hello')
})

app.listen(port, () => console.log('Server running on port ',port))