import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/wardrobeVault`)
        console.log(`connected to database on ${mongoose.connection.host}`)
    } catch (error) {
        console.log("Not connected to db!!!!",error)
    }
} 

export default connectDB;