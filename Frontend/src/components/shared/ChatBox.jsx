import React from 'react'
import { Box } from "@chakra-ui/react"
import Single from './Single'

function ChatBox() {
  return (
    <Box className='flex flex-col items-center  bg-gray-300 rounded-md w-full'>
      <Single/>
    </Box>
  )
}

export default ChatBox