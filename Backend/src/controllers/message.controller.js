import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiRespone } from "../../utils/ApiResponce.js";
import { Message}from "../models/message.model.js";
import {Chat }from "../models/chat.model.js";


const sendMessage=asyncHandler(async(req,res)=>{
    try {
        const {chatId,content}=req.body;
        if(!chatId||!content){
            throw new ApiError(400,"Please provide chatId and content");
        }
        const chat = await Chat.findById(chatId);
        if(!chat){
            throw new ApiError(404,"Chat not found");
        }
        const newMessage=await Message.create({
            chatId:chatId,
            senderId:req.user._id,
            content,
        })
        const findmessage=await Message.findById(newMessage._id).populate("chatId","participants").populate("senderId","fullName avatar");
        await Chat.findByIdAndUpdate(chatId,{
            lastMessage:content,
        });
        return res.status(201).json(new ApiRespone(201,findmessage,"Message sent successfully"));
    } catch (error) {
        
        throw new ApiError(500,`${error}Something went wrong in sending message`);
    }
});

const fetchMessage=asyncHandler(async(req,res)=>{
    const {chatId}=req.params;
    const page=Number(req.query.page)||2;
    let limit=20;
    let skip=(page-1)*limit;
    if(!chatId){
        throw new ApiError(400,"Please provide chatId");
    }
    const chat=await Message.find({chatId:chatId}).sort({createdAt:-1}).skip(skip).limit(limit).populate("senderId","fullName avatar")
    if(chat.lenth===0){
        throw new ApiError(404,"Chat not found");
    }
    return res.status(200).json(new ApiRespone(200,chat,"Message fetched successfully"));

});


export {sendMessage,fetchMessage}