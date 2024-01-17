import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Chat',
         required: true
         },
    senderId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
         },
    content: String,
    status: {
         type: String, 
        enum: ['read', 'unread'] 
    },
  },
  {
    timestamps: true,
  });
  
export const Message = mongoose.model('Message', messageSchema);
  