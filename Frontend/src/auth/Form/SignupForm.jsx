import React from 'react'
import { useFormik } from "formik";
import { SignUpSchema } from '../../lib/validation';
import { createUser } from '../../lib/server/api';
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
import { Link } from 'react-router-dom';

function SignupForm() {
  const toast = useToast()
  const { handleSubmit, handleChange, values, errors,touched } = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",

    },
    validationSchema:SignUpSchema,
    onSubmit: async(values) => {
      const {fullName,username,email,password} = values
      createUser({fullName,username,email,password})
      .then((res)=>{
        console.log(res);
        toast({
          title: "Account created ",
          description: "",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch((err)=>{
        console.log(err.message)
        toast({
          title: err.message,
          description: "Try to signIn with your credentials",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }) 

    },
  });

  return (
   
   
     
     <div className='sm:w-420  flex-center flex-col'>
      <h2 className=' h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new Account</h2>
        <p className='text-light-3 sm:small-medium md:base-regular mt-2'>To use this Enter your account details</p>
     <form onSubmit={handleSubmit}  className='flex flex-col w-full mt-4 gap-5'>
            <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={!!errors.fullName && touched.fullName}>
                <FormLabel  htmlFor="email">FullName</FormLabel>
                <Input
                  name='fullName'
                 type='name'
                 value={values.fullName}
                  onChange={handleChange}
                   />
                   <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              </FormControl >
              <FormControl isInvalid={!!errors.username && touched.username}>
                <FormLabel htmlFor="email">username</FormLabel>
                <Input
                 
                  name='username'
                 type='text'
                  value={values.username}
                  onChange={handleChange}
                   />
                   <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>
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
        Already have an account? 
        <Link to={'/signin'} className='text-blue-500 ml-1 text-small-semibold'> Log in</Link>
      </p>
          </form>
     </div>
         
    
 
  )
}

export default SignupForm