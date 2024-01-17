import { ApiError } from '../../utils/ApiError.js';
import {asyncHandler} from '../../utils/asyncHandler.js';  
import {User} from '../models/user.model.js';
import { uploadOnCloudinary } from '../../utils/cloudnary.js';
import { ApiRespone } from '../../utils/ApiResponce.js';
import jwt from 'jsonwebtoken';

 export const generateTokens = async(userId)=>{
      try {
     const user= await User.findById(userId);
     const accessToken= user.generateAccessToken();
     const refressToken= user.generateRefreshToken();
        user.refressToken=refressToken; 
        await user.save({validateBeforeSave:false});
        return {accessToken,refressToken};
      } catch (error) {
        throw new ApiError(500,`${error}Something went wrong in generateing tokens`);
      }
}

const registerUser=asyncHandler(async(req,res)=>{
   const {fullName,email,password,username}=req.body;
   console.log(req.body.email);
   if([fullName,email,password,username].some((item)=>item?.trim()==="")){
       throw new ApiError(400,"Please fill all the fields");
   }

  const exitedUser=await User.findOne({
    $or: [
      { email },
      { username },
    ],
   })
   if(exitedUser){
       throw  res.status(409).json(new ApiError(409,"User already exists"));
   }
  // const avatarLocalPath= req.files?.avatar[0]?.path;
 
  //   if(!avatarLocalPath){
  //       throw new ApiError(400,"Please upload avatar");
  //   }

  // const avatar= await uploadOnCloudinary(avatarLocalPath);
  //  if(!avatar){
  //     console.log(avatar);
  //      throw  new ApiError(500,"Something went wrong");
  //  }
    const user=await User.create({
         fullName,
         email,
         password,
         username:username.toLowerCase(),
         avatar:"",
    });
   const createUser= await User.findById(user._id).select("-password -refressToken");  
   if(!createUser){
       throw new ApiError(500,"Something went wrong for register user");
   }
   return res.status(201).json(new ApiRespone(200,createUser,"User registered successfully"));


}
);

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password,username}=req.body;

    if(!username&&!email){
        throw new ApiError(400,"Please fill all the fields");   
    }
   const user=await User.findOne({
        $or:[{email},{username}]
     })

    if(!user){
        throw new ApiError(401,"Invalid credentials");
    } 
   const isPasswordValid= await user.matchPassword(password);
   console.log(isPasswordValid);
   if(!isPasswordValid){
    throw new ApiError(401,"Invalid credentials");
} 
    const {accessToken,refressToken}=  await generateTokens(user._id)

    const newUser=await User.findById(user._id).select("-password -refressToken");
    const option={
        httpOnly:true,
        sameSite:'None',
        secure:true,
    }
   
   return  res.status(200).cookie("refressToken",refressToken,option).cookie("accessToken",accessToken,option).json(new ApiRespone(200,{user:newUser,accessToken,refressToken},"User logged in successfully"));
   


});

const logoutUser=asyncHandler(async(req,res)=>{
     await User.findByIdAndUpdate(req.user._id,{
        $set:{refressToken:undefined}
       },{
              new:true
         });
      const option={
        httpOnly:true,
        sameSite:'None',
        secure:true,}
        return res.status(200).clearCookie("refressToken",option).clearCookie("accessToken",option).json(new ApiRespone(200,{},"User logged out successfully"));   
     

});

const refressAccessToken=asyncHandler(async(req,res)=>{
   const incomingRefressToken= req.cookies.refressToken||req.body.refressToken;
    if(!incomingRefressToken){
         throw new ApiError(401,"Please login again");
    }
   const decodedToken= await jwt.verify(incomingRefressToken,process.env.REFRESH_TOKEN_SECRET);
     try {
       const user= await User.findById(decodedToken._id);
         if(!user){
             throw new ApiError(401,"Please llllogin again");
         }
         if(user.refressToken!=incomingRefressToken){
           console.log(user.refressToken);
           console.log(incomingRefressToken);
             throw new ApiError(401,"Refress token is not valid");
         }
         const option={
             httpOnly:true,
             sameSite:'None',
             secure:true,
         }
      const { accessToken,refressToken} =  await generateTokens(user._id);
      return res.status(200).cookie("refressToken",refressToken,option).cookie("accessToken",accessToken,option).json(new ApiRespone(200,{accessToken,refressToken},"Access token generated successfully"));
     } catch (error) {
       // console.log(error);
         throw new ApiError(500,`${error}Something went wrong`);
     }
    
});

const getUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id).select("-password -refressToken");
    if(!user){
        throw new ApiError(404,"User not found");
    }
    return res.status(200).json(new ApiRespone(200,user,"User found successfully"));
})

const serachUsers=asyncHandler(async(req,res)=>{
    const {search}=req.query;
    if(!search){
        throw new ApiError(400,"Please provide search query");
    }
    const users=await User.find({
        $or:[
            {email:new RegExp(search,"i")},
            {username:new RegExp(search,"i")},
        ]
    }).find({_id:{$ne:req.user._id}}).select("-password -refressToken");
    return res.status(200).json(new ApiRespone(200,users,"Users found successfully"));
})
const checkstatus=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const user=await User.findById(id);
    if(!user){
        throw new ApiError(404,"User not found");
    }
    return res.status(200).json(new ApiRespone(200,user,"User found successfully")).populate("status");
})

export {registerUser, loginUser ,refressAccessToken,logoutUser,getUser,serachUsers,checkstatus}