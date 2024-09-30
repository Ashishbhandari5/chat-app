import {Request,Response} from "express";
import prisma from "../db/prisma.js";



export const sendMessage=async (req:Request,res:Response)=>{
  try{
const {message}=req.body;
const {id:receiverId}=req.params;
const senderId=req.user.id;


let conversation =await prisma.conversation.findFirst({
  where:{
    participantIds:{
      hasEvery:[senderId,receiverId]
    }
  }
})


if(!conversation){
  conversation=await prisma.conversation.create({
    data:{
      participantIds:{
        set:[senderId,receiverId]
      }
    }
  })}
  const newMessage=await prisma.message.create({
    data:{
      senderId,
      body:message,
      conversationId:conversation.id
    }
  });
  if(newMessage){
    conversation=await prisma.conversation.update({
      where:{
        id:conversation.id
      },
      data:{
        messages:{
          connect:{
            id:newMessage.id,
          }
        }
      }
    })
  }


res.status(201).json(newMessage)
  }catch(error:any){
    console.log("error in sending message",error.message)
    res.status(500).json({error:"Internal server error"});
  }
}
export const getMessage=async(req:Request,res:Response)=>{
  try{
    const {id:userToChat}=req.params;
    const senderId=req.user.id;
    const conversation=await prisma.conversation.findFirst({
      where:{
        participantIds:{
          hasEvery:[senderId,userToChat]
        }
      },
      include:{
        messages:{
          orderBy:{
            createdAt:"asc"
          }
        }
      }
    })
    if(!conversation){
      return res.status(200).json([]);

    }
    res.status(200).json(conversation.messages);

  }catch(error:any){
    console.log("error in getMessage",error.message);
    res.status(500).json({error:"Internal server error"});
  }
}