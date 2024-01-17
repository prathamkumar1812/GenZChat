import { Avatar, Box, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { getsender } from '../../lib';
import { fetchChats } from '../../lib/server/api';
import { useDispatch, useSelector } from 'react-redux';
import SenderDetails from './SenderDetails';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
   
  } from '@chakra-ui/react'
import { setChats ,setSelectChat } from '../../Redux/authSlice';

function Mychats() {
    const finalRef = React.useRef(null)
   const chats=useSelector((state)=>state.chats);
   const dispatch = useDispatch()
    const user=useSelector((state)=>state.userData);
    
    const selectedhandler=(sender)=>{
      dispatch(setSelectChat(sender))
    }
    useEffect(() => {
        fetchChats().then((res)=>{
          // console.log(res)
          dispatch(setChats(res.message))
        }).catch((err)=>{
          console.log(err)
        })  
    }, [])
  return (
    <Box d={"flex"}
    flexDir={"column"}
    p={3}
    bg={"white"}
    w="31%"
     className='border-gray-600 border'>
   <Box className='flex flex-col w-full h-full overflow-y-hidden'>
    <Stack className=' overflow-y-scroll'>
        {
           chats.map((chat)=>{
            const sender=getsender(chat.participants,user);
            return (
             <Box className='flex items-center gap-5 bg-gray-500 cursor-pointer  rounded-md px-2 py-5' key={chat._id} onClick={()=>{selectedhandler(chat)}}>
                <SenderDetails sender={sender}/>            
             <Text>
               {
                !chat.type?sender.fullName:chat.chatName
               }
             </Text>
              
             </Box>
            )
              
           })
        }
    </Stack>

   </Box>

    </Box>
  )
}

export default Mychats