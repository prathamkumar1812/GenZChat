/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import SignupForm from './Form/SignupForm'
import SignInForm from './Form/SignInForm'
import useAuth from '../hooks/useAuth'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import LeftsideBar from '../components/shared/LeftsideBar'

function AuthLayout() {

  //  const auth=useAuth();
  //  console.log(auth)
  const auth = useSelector((state) => state.status)
  const userData=useSelector((state) => state.userData)
  //  console.log(userData)
  const location = useLocation()
  // console.log(auth)
  return (
    <>{
      ! auth ? (<Navigate to="/signin"  state={{from:location}} replace /> ):
      (<>
      <div className='w-full md:flex'>
      {/* <Topbar/> */}
      <LeftsideBar/>
      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
      {/* <Bottombar/> */}
    </div>
      {/* <img src="" alt="logo" className='hidden md:block h-screen w-1/2 object-cover bg-no-repeat' /> */}
      </>)
  }
  </>
  )
}

export default AuthLayout