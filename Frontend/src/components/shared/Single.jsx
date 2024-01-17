import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarBadge, Box, Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react'
import { getsender } from '../../lib'
import InfiniteScroll from 'react-infinite-scroll-component';
import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons';

import { fetchChats, fetchMessages, sendingMessage } from '../../lib/server/api';
import ScrollChats from './ScrollChats';
import io from 'socket.io-client';
import { useInfinitemessage } from '../../lib/react-query/queryAndMutation';

var socket;
function Single() {
    const userData=useSelector((state)=>state.userData);
    const [newmessage,setNewMessage]=React.useState(''); 
    const [typing,setTyping]=React.useState(false); 
  const [istyping,setIsTyping]=React.useState(false);
    const [messages,setMessages]=React.useState([]);
    const [socketconnection,setSocketConnection]=React.useState(false);
    const  selectedChat=useSelector((state)=>state.selectedChat)
     const sender= selectedChat&&getsender(selectedChat.participants,userData);

       // console.log(data);
    
   
     useEffect(() => {
        socket = io('http://localhost:3000');
         socket.emit("setup",userData);
         socket.on("connected",()=>{
            setSocketConnection(true);
         })
         socket.on("typing",()=>{setIsTyping(true)})
        socket.on("stop typing",()=>{setIsTyping(false)})
            }, [])
     
     const fetchMessage=async()=>{
        if(!selectedChat){ return }
        try {
           // console.log(selectedChat._id)
        
           const data= await fetchMessages(selectedChat._id);
       
            setMessages(data.message);
          
           socket.on("online",(data)=>{
            console.log(data)
           if(sender&&data==sender._id){
            console.log("online")
           }
          })
          socket.on("offline",(data)=>{
           console.log(data)
           if(sender&&data==sender._id){
            console.log("offline")
           }
          })
            //console.log(data);
        } catch (error) {
            console.log(error)
        }

     }
        const handleSendMessage=(e)=>{
            e.preventDefault();
            socket.emit("stop typing",selectedChat._id);
            setNewMessage('');
            sendingMessage(selectedChat,newmessage).then((res)=>{
               console.log(res.message)
                socket.emit("new message",res.message)
                setMessages([res.message,...messages])
            }
            ).catch((err)=>{
                console.log(err)
            })
        }
     const  typinghandler=(e)=>{
             setNewMessage(e.target.value);

             if(!socketconnection){
              return
             }
             if(!typing){
              setTyping(true);
              socket.emit("typing",selectedChat._id);
             }
              var lastTypingTime= new Date().getTime();
              var timelenght=3000;
              setTimeout(()=>{
                var timenow=new Date().getTime();
                var timeDiff=timenow-lastTypingTime;
                if(timeDiff>=timelenght&&typing){
                  socket.emit("stop typing",selectedChat._id);
                  setTyping(false);
                }
              },timelenght);
             
        }
        
        useEffect(() => {
           
          //  fetchMessage();
       // setMessages(data?.pages[0].message)
     selectedChat&&socket.emit("join chat",selectedChat._id);
           

        }, [selectedChat])

        useEffect(() => {
            socket.on("message received",(newmessage)=>{
                console.log(newmessage)
                setMessages([...messages,newmessage])
            })
        })
  return (
    <>{  
        selectedChat?(<>
            <nav className=' w-full  h-[10%]  py-3 bg-purple-400 border border-purple-500 flex
             px-3  gap-5 items-center justify-evenly'>
                
                <Avatar className='w-1/5 border' name={sender.fullName} src={sender.avatar} >
               {sender.status=="online"&& <AvatarBadge boxSize='1.25em' bg='green.500' />}
                </Avatar>
                <Box className='w-full border'>
                <Text className='text-3xl '>
                    {sender.fullName}
                </Text>
                </Box>
                
                <Menu className="w-1/5">
  <MenuButton
    as={IconButton}
    aria-label='Options'
    icon={<HamburgerIcon />}
    variant='outline'
  />
  <MenuList>
    <MenuItem icon={<AddIcon />} command='⌘T'>
      New Tab
    </MenuItem>
    <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
      New Window
    </MenuItem>
    <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
      Open Closed Tab
    </MenuItem>
    <MenuItem icon={<EditIcon />} command='⌘O'>
      Open File...
    </MenuItem>
  </MenuList>
                </Menu>
            </nav>
            <Box className='flex flex-col w-full h-full overflow-y-hidden justify-end'>
            <Box className=' flex overflow-y-scroll flex-col'>
              <ScrollChats messages={messages} setMessages={setMessages}/>
              {/* {console.log(message)} */}
             
            </Box>
            <form  className="h-[8%] min-h-14 "onSubmit={(e)=>handleSendMessage(e)}>
            {istyping?<Text className='text-white text-xl'>Typing...</Text>:<></>}
                <div className='w-full h-full flex bg-gray-500 rounded-md'>
                
                    <input type='text' className='w-full  outline-none px-3' value={newmessage} onChange={(e)=>typinghandler(e)} placeholder='Type a message'/>
                    <Button isDisabled={newmessage?false:true} type='submit' colorScheme='blue' height={"full"} className='w-1/5 h-full text-white'>Send</Button>
                </div>
            </form>
            </Box>
           

        </>):(<Box className='flex justify-center  items-center h-full '>
            <Text className='text-3xl'>
            Click on the chat to start conversation
            </Text>
         
        </Box>)
    }
    </>
  )
}

export default Single