import dotenv from 'dotenv';
import {httpServer} from "./app.js"
import connectDB from './db/index.js';

connectDB().then(()=>{
 httpServer.listen(process.env.PORT||3000, () => {
   console.log(`\n Server running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.error("Mongodb connnection failed:", error);
    throw new Error(error);
});
