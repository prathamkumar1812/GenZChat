import React, { Children, useState } from 'react'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Skeleton, Stack, flexbox, useDisclosure } from '@chakra-ui/react'
import { createChat, searchUsers } from '../../lib/server/api';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, setSelectChat } from '../../Redux/authSlice';

function Search({children}) {
  const dispatch = useDispatch()  
  const chats=useSelector((state)=>state.chats);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [search,setSearch] = useState('');
  const [searchResults,setSearchResults] = useState([]);
  const [createChatloading,setCreateChatLoading] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleSearch=async()=>{
      setLoading(true);
      searchUsers(search).
      then((res)=>{
        setSearchResults(res.message);
        setLoading(false)
      }).catch((err)=>
      {console.log(err);
        setLoading(false)})
  }
  const handleCreateChat=async(id)=>{
     try {
        setCreateChatLoading(true);
        const res= await createChat(id);
        console.log(chats)
         console.log(res.message);
        if(!chats.find((chat)=>chat._id===res.message._id)){
          dispatch(setChats([...chats,res.message]));
        }
        dispatch(setSelectChat(res.message));
        setCreateChatLoading(false)
     } catch (error) {
        console.log(error);
        setCreateChatLoading(false)
     }
  }
  return (
    <>
      <div ref={btnRef} onClick={onOpen}>
        {children}
      </div>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className=' border-b border-red text-center'>Search Users</DrawerHeader>

          <DrawerBody>
            <Box className='flex pb-3'>
              <Input placeholder='Search' value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
              <Button onClick={handleSearch} isDisabled={search?false:true} colorScheme='blue' className='ml-2'>Search</Button>
            </Box>
            {
              loading?(<Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
              </Stack>):(
                <Stack>
                  {
                    searchResults.map((user)=>{
                      return (
                        <Box onClick={()=>handleCreateChat(user._id)} className='flex bg-gray-300 items-center gap-2 w-full cursor-pointer px-3 py-2 mb-2 rounded-md' key={user._id}>
                          <Avatar cursor={"pointer"} name={user.fullName} src={user.avatar} />
                          <p className='body-bold'>{user.fullName}</p>
                        </Box>
                      )
                    })
                  }
                </Stack>
              )
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Search