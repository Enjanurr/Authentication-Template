import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt"
import { Request, Response } from "express";
import { User } from "../database/database";
import cookies from "cookie-parser";

dotenv.config();


// At this point you need to store the refresh Token on the cookie then return the access to the front
export const login = async(req:Request,res: Response): Promise<any> => {
try{

    const {userEmail,userPassword} = req.body;

    if(!userEmail || !userPassword){
        return res.status(400).json({message : "Email and password is required"});
    }

    const user = await User.findOne({userEmail});
    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    const isMatch  = await bcrypt.compare(userPassword , user.userPassword);


    if(!isMatch){
   return res.status(401).json({ message: "Invalid credentials" });

    }
   

    // Tokens section 
 const payload = { _id: user._id };

// Access token (short-lived)
const accessToken = jwt.sign(
  payload,
  process.env.JWT_SECRET!,
  { expiresIn: "5s" }
);

// Refresh token (long-lived)
const refreshToken = jwt.sign(
  payload,
  process.env.REFRESH_TOKEN_SECRET!,
  { expiresIn: "7d" }
);

// Store refresh token in HttpOnly cookie
// secure: process.env.NODE_ENV === production ,
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure : false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

// Send access token to frontend
return res.status(200).json({
  message: "Login successful",
 accessToken:accessToken
});


}catch(error){
    console.log("Login error",error);
    return res.status(500).json({message:"Something went wrong, please try again"});
}
}

export const register = async(req:Request , res: Response) : Promise<any> => {
  
    try{
     const {userName, userEmail, userPassword} = req.body;

  
     if(!userName || !userEmail || !userPassword){
        return res.status(400).json({message:"All fields are required"});
     }
     
    
     const exist = await User.findOne({ userEmail });
      if (exist) {
        return res.status(409).json({ message: "User already exists" });
      }


     if(userPassword.length < 5){
        return res.status(400).json({message: "Password too short"});
     }
     
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(userPassword ,salt);

     const newUser = await User.create({
        userName,
        userEmail,
        userPassword: hashedPassword
     })

     return res.status(200).json({message: "User successfully registered", user: newUser}) // to be sent to the frontend

    }catch(error){
     console.log("Server error",error);
       return res.status(500).json({ message: "Internal server error (Register)" });
    }
}

export const logout = async (req: Request, res: Response) => {
  console.log('🚪 Logout request received');
  
  // Clear the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
  });

  return res.status(200).json({ 
    message: "Logged out successfully" 
  });
};