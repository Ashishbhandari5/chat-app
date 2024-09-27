import { Request,Response } from "express"
import prisma from "../db/prisma.js"
import bcryptjs from 'bcryptjs';
import generateToken from "../utils/generateToken.js";




export const logout=async(req:Request,res:Response)=>{}


export const signup=async(req:Request,res:Response)=>{
  try{
const {fullname,username,password,confirmPassword,gender} =req.body;
if(!fullname || !username || !password || !confirmPassword ||  !gender){
  return res.status(400).json({error:'Please Fillyyy in all fields'});
  
}
if(password!==confirmPassword){
  return res.status(400).json({error:'Password dont match'});
}
const user=await prisma.user.findUnique({
  where:{username}
})
if(user){
  return res.status(400).json({error:'User already Exists'})
}
const salt=await bcryptjs.genSalt(10);
const hashedPassword=await bcryptjs.hash(password,salt);

const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

const newUser=await prisma.user.create({
  data:{
    fullname,
    username, 
    password,
    gender,
    profilepic:gender==="male" ? boyProfilePic : girlProfilePic,

  }
})
if(newUser){
  generateToken(newUser.id,res)
  //generate token in a second
  res.status(201).json({
    id:newUser.id,
    fullname:newUser.fullname,
    username:newUser.username,
    profilePic:newUser.profilepic,
  })
}else{
  res.status(400).json({error:'Invalid Data'});
}
}catch (error:any){
  console.log("error in signUp controller",error.message);
  res.status(500).json({error:"inetrnal server Error"})
}
}


export const login=async(req:Request,res:Response)=>{
  try{
    const {username,password}=req.body;
    const user =await prisma.user.findUnique({where:{username}});
    if(!user){
      return res.status(400).json({error:"Invalid User"});
    }
      const isPasswordCorrect =await bcryptjs.compare(password,user.password);
      if(!isPasswordCorrect){
        return res.status(400).json({error:"invalid Password"})
      }
    generateToken(user.id,res);
    res.status(200).json({
      id:user.id,
      fullname:user.fullname,
      username:user.username,
      profilepic:user.profilepic
    })
  }catch(error:any){
    console.log("error in signUp controller",error.message);
    res.status(500).json({error:"inetrnal server Error"})
  }
  }



