import { Request,Response } from "express"
import prisma from "../db/prisma.js"
import bcryptjs from 'bcryptjs';
export const login=async(req:Request,res:Response)=>{
  
}
export const logout=async(req:Request,res:Response)=>{}
export const signup=async(req:Request,res:Response)=>{
  try{
const {fullname,username,password,confirmPassword,gender} =req.body;
if(!fullname || !username || !password || !confirmPassword ||  !gender){
  return res.status(400).json({error:'Please Fill in all fields'});
  
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

const boyProfilePic
  }catch(error)
}
