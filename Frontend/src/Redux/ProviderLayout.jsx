import React, { useEffect } from 'react'

import { useSelector,useDispatch } from 'react-redux'
import { getUser } from '../lib/server/api';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';

function ProviderLayout( {children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

 
   const currentUser =async()=>{
   try {
      const user=await getUser();
      if(user){
        // console.log(user)
          dispatch(login(user.message));
          return true;

      }
      return false;
   } catch (error) {
       console.log(error)
   }
  
   }
   useEffect(() => {
   // console.log('useEffect')
        (async()=>{
            const user=await currentUser();
            if(user){
                navigate('/')
            }
        })()
        
   }, [])

  return (
    <>
         {children}
    </> 
  
  )
}

export default ProviderLayout