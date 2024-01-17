import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: 'dzlwlxwvx', 
  api_key: '384899175235545', 
  api_secret: '4j4-hnL5Y_3Cn4j0fwmhdqR_3MQ' 
});
const uploadOnCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
       const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",

        });
       fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export {uploadOnCloudinary}