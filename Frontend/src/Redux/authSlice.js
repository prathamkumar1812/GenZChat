import { createSlice } from "@reduxjs/toolkit";

export const initialState={
    status:false,
    userData:null,
    selectedChat:null,
    chats:[],
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
       login:(state,action)=>{
           state.status=true;
           state.userData=action.payload
       },
       logout:(state)=>{
          state.status=false;
          state.userData=null;
       },
       setSelectChat:(state,action)=>{
           state.selectedChat=action.payload;
       },
         setChats:(state,action)=>{
              state.chats=action.payload;
         }
    }
})
export const {login,logout,setSelectChat,setChats}=authSlice.actions
export default authSlice.reducer;