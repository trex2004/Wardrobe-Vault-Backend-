import {v2 as cloudinary} from "cloudinary"

const connectCloud = async () => {

    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        })
        console.log(`connected to cloudinary`)
    } catch (error) {
        console.log("Not connected to cloudinary!!!!",error)
    }
}

export default connectCloud