import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, ButtonGroup } from '@chakra-ui/react'
import AuthLayout from './auth/AuthLayout'
import { Routes,Route } from 'react-router-dom'
import SignupForm from './auth/Form/SignupForm'
import SignInForm from './auth/Form/SignInForm'
import RootLayout from './root/RootLayout'
import Home from './root/pages/Home'
import Secure from './root/Secure'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className='flex h-screen'>
            <Routes>
              <Route path='/' element={<RootLayout/>}>
              <Route element={<AuthLayout/>}>
                <Route path='/' element={<Home/>}/>
               </Route>
               <Route element={<Secure/>}>
               <Route path='/signup' element={<SignupForm/>}/>
               <Route path='/signin' element={<SignInForm/>}/>
               </Route>
              
               
             
               </Route>
            </Routes>
      </main>
    </>
  )
}

export default App
