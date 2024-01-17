import React, { useEffect } from 'react'
import {Button, Flex, Spinner, Text} from '@chakra-ui/react'
import ScrollableFeed from 'react-scrollable-feed'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInView } from 'react-intersection-observer';
import { useInfinitemessage } from '../../lib/react-query/queryAndMutation';

function ScrollChats({messages,setMessages}) {
  const { ref, inView } = useInView();
   const userData=useSelector((state)=>state.userData);
   const  selectedChat=useSelector((state)=>state.selectedChat)
   const {data,fetchNextPage,hasNextPage,isError}=useInfinitemessage(selectedChat&&selectedChat._id); 
  //  console.log(data);
   useEffect(() => {
    const messages= data?.pages.reduce((acc,page)=>[...acc,...page.message],[]);
    
    setMessages(messages);
   }, [selectedChat ,data])
   useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
   }, [inView])
  return (
    
    <ScrollableFeed className=' h-full custom-scrollbar ' 
    dataLength={messages?messages.length:0} hasMore={hasNextPage} loader={<div>Loading</div>} >
        <div className='flex flex-col-reverse'>
        {
      messages&&messages.map((message)=>{

         return (
           <div className={`flex mx-12 my-1${message.senderId._id===userData._id?" justify-end items-end":" justify-start items-start"}` }key={message._id}>
             
             <div className="bg-blue-500 text-white rounded-lg p-3 mt-2 shadow-md hover:shadow-lg">
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-light-3 ">12:30 PM</p> 
            </div>
            
           </div>
         )
       })
     }
     {hasNextPage &&(
        <div ref={ref} className="mt-10 flex justify-center items-center">
          <Spinner size='lg' />
        </div>
      )}
        </div>
     
   </ScrollableFeed>)
}

export default ScrollChats