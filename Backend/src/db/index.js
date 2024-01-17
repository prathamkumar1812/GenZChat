import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

const connectDB = async () => {
    try {
     const connnectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log("\n MongoDB connected");
    } catch (error) {
        console.error("Mongodb connnection Error:", error);
        throw new Error(error);
    }
    };

 export default connectDB;   