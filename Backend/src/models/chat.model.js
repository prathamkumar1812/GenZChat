import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatName: String,
    type: { type: Boolean,default: false },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    
  }
  ,{
    timestamps: true,}
    );
  
export const Chat = mongoose.model('Chat', chatSchema);
  