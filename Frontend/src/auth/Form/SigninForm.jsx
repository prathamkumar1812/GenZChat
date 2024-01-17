import React from 'react'
import { useFormik } from "formik";
import { SignInSchema } from '../../lib/validation';
import { loginUser } from '../../lib/server/api';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react"
import { useNavigate,useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/authSlice';


function SignInForm() {
  const dispatch = useDispatch()
  const toast = useToast()
  const nagivate=useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || { pathname: "/" };
  const { handleSubmit, handleChange, values, errors,touched,resetForm } = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    validationSchema:SignInSchema,
    onSubmit: async(values) => {
      const {email,password} = values
      loginUser({email,password})
      .then((res)=>{
        console.log(res.message.user)
        resetForm();
        dispatch(login(res.message.user))
        nagivate(from ,{replace:true});

      })
      .catch((err)=>{
        console.log(err.message)
        toast({
          title: err.message,
          description: "Try to signIn with your credentials",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }) 

    },
  });

  return (
   
   
     
     <div className='sm:w-420  flex-center flex-col'>
      <img src="" alt="" />
        <h2 className=' h3-bold md:h2-bold pt-5 sm:pt-12'>Login to your Account</h2>
        <p className='text-light-3 sm:small-medium md:base-regular mt-2'>Welcome back!  Enter your account details</p>
     <form onSubmit={handleSubmit}  className='flex flex-col w-full mt-4 gap-5'>
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  name='email'
                 type='email'

                  value={values.email}
                  onChange={handleChange}

                   />
                   <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password} >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  name='password'
                 type='password'
                  value={values.password}
                  onChange={handleChange}
                   />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
             
                Remember me?
             
         <Button type="submit" colorScheme="blue" width="full">
                Login
              </Button>
            </VStack>
            <p className='text-small-regular text-light-2 text-center mt-2'>
             Don't have an account? 
        <Link to={'/signup'} className='text-primary-500 ml-1 text-small-semibold'>Sign up</Link>
      </p>
          </form>
     </div>
         
    
  )
}

export default SignInForm