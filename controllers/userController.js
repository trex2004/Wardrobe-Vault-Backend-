import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const loginController = async (req,res) => {
    try {
        console.log("here")

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Wrong Credentials" })
        }
        
        const passowrdMatch = await bcrypt.compare(password,user.password)
        if(passowrdMatch){
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });        
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({ success: true, message: "Login successful" });
        }
        else{
            res.json({ success: false, message: "Wrong Credentials" });
        }
                
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error })
    }
} 

export const registrationController = async (req,res) => {
    try {
        const { name, email, password } = req.body
        const userExist = await userModel.findOne({email})
        
        if (userExist) {
            return res.status(200).json({success:false, message:'user already exist'})
        } 
        
        if(!validator.isEmail(email)){
            return res.status(200).json({success:false, message:'email is not valid'})
        }        
        
        const salt = await bcrypt.genSalt(7)
        const hashedPass = await bcrypt.hash(password,salt)
        
        const newUser = new userModel({name,email, password: hashedPass})
        
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });        
        
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ success: true, message: "Registration successful" });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error })
    }
} 

export const adminLoginController = async (req,res) => {
    
} 