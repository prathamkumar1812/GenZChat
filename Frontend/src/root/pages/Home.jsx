import { Button, Input, flexbox } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { fetchChats } from '../../lib/server/api';
import { Box } from '@chakra-ui/react';
import Mychats from '../../components/shared/Mychats';
import { Chat } from '../../../../Backend/src/models/chat.model';
import ChatBox from '../../components/shared/ChatBox';

function Home() {
 
  return (
    <div className='w-full'>
      <Box className='flex w-full h-screen'> 
        <Mychats/>
        <ChatBox/>
      </Box>

    </div>
    
  )
}

export default Home