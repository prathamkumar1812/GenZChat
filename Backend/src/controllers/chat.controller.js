import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiRespone } from "../../utils/ApiResponce.js";
import {Chat }from "../models/chat.model.js";


 const accessChat= asyncHandler(async(req,res)=>{
   try {
     const {userId}=req.body;
     if(!userId){
         throw new ApiError(400,"Please provide userId");
     }
     const chat=await Chat.findOne(
         {
             $and:[
                 {participants:{$elemMatch:{$eq:userId}}},
                 {participants:{$elemMatch:{$eq:req.user._id}}}
             ]
         }
     ).populate("participants","fullName email avatar")
     if(chat){
         return res.status(200).json(new ApiRespone(200,chat,"Chat found"));
     }
     else{
        const newChat = await Chat.create({
            chatName: req.user.name,
            type: false,
            participants: [req.user._id,userId],
        });
        const createChat= await Chat.findById(newChat._id).populate("participants","fullName email status avatar")
        return res.status(201).json(new ApiRespone(201,createChat,"Chat created successfully"));
     }
 
   } catch (error) {
        throw new ApiError(500,`${error}Something went wrong in access chat`);
   }
 })

 const fetachChat=asyncHandler(async(req,res)=>{
        try {
            const chats=await Chat.find({
                type: false,
                participants:{$elemMatch:{$eq:req.user._id}}
            }).populate("participants","fullName email status avatar").sort({updatedAt:-1});
            return res.status(200).json(new ApiRespone(200,chats,"Chats found"));
        } catch (error) {
            throw new ApiError(500,`${error}Something went wrong in fetch chat`);
        }
 });   
 const createGroupChat=asyncHandler(async(req,res)=>{ 

    try {
         if(!req.body.chatName||!req.body.participants){
                throw new ApiError(400,"Please provide chat name");
         }
         const {chatName,participants}=req.body;
         participants=JSON.parse(participants);
         if(participants.length<2){
                throw new ApiError(400,"two people are required to create a group chat");
            }
            participants.push(req.user._id);
         const newGroup=await Chat.create({
                chatName,
                type: true,
                participants,
                admin:req.user._id
            });
         const createdGroup=await Chat.findById(newGroup._id).populate("participants","name email avatar");  
            return res.status(201).json(new ApiRespone(201,createdGroup,"Group created successfully")); 
    } catch (error) {
        
        throw new ApiError(500,`${error}Something went wrong in create group chat`);
    }
     })

const addToGroupChat=asyncHandler(async(req,res)=>{
   try {
     const {chatId,userId}=req.body;
     if(!chatId||!userId){
         throw new ApiError(400,"Please provide chatId and userId");
     }
     const addTochat=await Chat.findByIdAndUpdate(chatId,{
         $push:{participants:userId}
     },{new:true}).populate("participants","name email avatar");
    if(!addTochat){
        throw new ApiError(404,"Chat not found");
     }
  return res.status(200).json(new ApiRespone(200,addTochat,"User added to chat successfully"));
 
   } catch (error) {
        throw new ApiError(500,`${error}Something went wrong in add to group chat`);
    
   }
    })
const removeFromGroupChat=asyncHandler(async(req,res)=>{
    try {
        const {chatId,userId}=req.body;
        if(!chatId||!userId){
            throw new ApiError(400,"Please provide chatId and userId");
        }
        const removeUser=await Chat.findByIdAndUpdate(chatId,{
            $pull:{participants:userId}
        },{new:true})
        if(!removeUser){
            throw new ApiError(404,"Chat not found");
        }
        return res.status(200).json(new ApiRespone(200,removeUser,"User removed from chat successfully"));
    } catch (error) {
        
        throw new ApiError(500,`${error}Something went wrong in remove from group chat`);
    }
})    



export  {accessChat,fetachChat,createGroupChat,addToGroupChat,removeFromGroupChat}