import React from 'react'
import { Outlet } from 'react-router-dom'

function Secure() {
  return (
    <>
    <section className=' flex flex-1 justify-center items-center flex-col py-10'>
        <Outlet/>
    </section>
    {/* <img src="" alt="logo" className='hidden md:block h-screen w-1/2 object-cover bg-no-repeat' /> */}
    </>
  )
}

export default Secure