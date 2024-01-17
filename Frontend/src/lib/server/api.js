import axios from 'axios';
import exp from 'constants';


export async function createUser(data){
    try {
        const userCreated=await axios.post('http://localhost:3000/api/v1/users/register',data);
        if(userCreated.status===200){
            return userCreated.data;
        } 
           
    } catch (error) {
        //console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
}
export async function loginUser(data){
    try {
        const userLogin=await axios.post('http://localhost:3000/api/v1/users/login',data,{
            withCredentials:true,
            headers:{
                'Content-Type':'application/json',
            }
        });
        if(userLogin.status===200){
            return userLogin.data;
        } 
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function logout (){
    try {
        const userLogout=await axios.post('http://localhost:3000/api/v1/users/logout',{},{
            withCredentials:true,
            headers:{
                'Content-Type':'application/json',
            }
        });
        if(userLogout.status==200){
            return userLogout.data;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function test(){
    try {
        console.log("the");
          await axios.get("http://localhost:3000/",{
            withCredentials:true
          });
    } catch (error) {
         console.log(error.message);
    }
    
}
export async function getUser(){
    try {
        const user=await axios.get("http://localhost:3000/api/v1/users/me",{
            withCredentials:true
        });
        if(user.status===200){
            return user.data;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function searchUsers(search){
    try {
        const users=await axios.get(`http://localhost:3000/api/v1/users?search=${search}`,{
            withCredentials:true
        });
        if(users.status===200){
            return users.data;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function fetchChats(){
    try{
         const chats=await axios.get('http://localhost:3000/api/v1/chat',{
            withCredentials:true
         });
         if(chats.status===200){
            return chats.data
         }
    }
    catch(error){
          throw new Error(error.message)
    }
}
export async function createChat(id){
    try{
        const chat=await axios.post(`http://localhost:3000/api/v1/chat/`,{userId:id},{
            withCredentials:true
        });
        if(chat.status===201){
            return chat.data;
        }
    }
    catch(error){
        throw new Error(error.message);
    }
}
export async function sendingMessage(chatId,content){
    try{
        const message=await axios.post('http://localhost:3000/api/v1/message',{chatId,content},{
            withCredentials:true
        });
        if(message.status===201){
            return message.data;
        }
    }
    catch(error){
        throw new Error(error.message);
    }
}
export async function fetchMessages({chatId,pageParam=1}){
    try{
        const messages=await axios.get(`http://localhost:3000/api/v1/message/${chatId}?page=${pageParam}`,{
            withCredentials:true
        });
        
            return {...messages.data,prevOffset:pageParam};
        
    }
    catch(error){
        throw new Error(error.message);
    }
}
