import { Box } from '@chakra-ui/react'
import { send } from 'process'
import React from 'react'

function MessageBox({message ,sender}) {
  return (
    <Box bg={sender?"blue":"green"} className='min-w-["20px"] h-2'>
        {message}
    </Box>
  )
}

export default MessageBox