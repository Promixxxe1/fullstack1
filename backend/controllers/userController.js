import UserModel from "../models/UserModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET) 
}


//roite for user login
const loginUser = async(req, res) =>{
    try {
        const{email, password} = req.body;

        //check if user exists (include password field which is not selected by default)
        const user = await UserModel.findOne({email}).select("+password");
        if(!user){
            return res.json({success: false, message: "User does not exist"});
        }
        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id);
            res.json({ success: true, token });
           
        }
        else{
            res.json({success: false, message: "Invalid credentials"});
        }
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message}) 
    }
}

//route for user registration

const registerUser = async(req, res) =>{
    try { 
        
        const {name, email, password} = req.body;

        //check if user already exists
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.json({success: false, message: "User already exists"});
        }
        //create new user
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Invalid email"});
        }
        if(password.length < 8){
            return res.json({success:false, message: "please enter a password with atleast 8 characters"});
        }
        
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        const token = createToken(savedUser._id);
        res.json({success: true, token})
        
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
        
    }

}

//route for admin login

const loginAdmin = async(req, res) =>{
try {
    const {email, password} = req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password, process.env.JWT_SECRET);
        res.json({success: true, token});
    }  else{
        res.json({success:false, message:"invalid credentials"});
    }
} catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
}
}


export {loginUser, registerUser, loginAdmin};