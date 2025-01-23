import { v2 } from "cloudinary"
import productModel from "../models/porductModel.js"

export  const addProduct = async (req,res) => {
    try {
        const data = req.body
        const files = req.files
        const images = [files.image1 && files.image1[0],files.image2 && files.image2[0]].filter((image)=>image!=undefined)

        let imageUrls = await Promise.all(
            images.map(async (image)=>{
                let url = await v2.uploader.upload(image.path,{resource_type:'image'})
                return(url.secure_url)
            })
        ) 

        const newProduct = new productModel({name:data.name,
            description:data.description,
            price:Number(data.price),
            category:data.category,
            subCategory:data.subCategory,
            sale: data.sale? Boolean(data.sale): false,
            salePrice: data.salePrice? Number(data.salePrice): 0,
            sizes: JSON.parse(data.sizes),
            image: imageUrls,
            date: Date.now()
        })

        await newProduct.save()

        res.json({success:true,msg:"product added"})

    } catch (error) {
        res.json({success:false})
        console.log("Error in add product")
        console.log(error)
    }
}