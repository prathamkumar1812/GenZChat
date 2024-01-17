import { Avatar, Button } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../lib/server/api';
import {AddIcon, ArrowForwardIcon} from '@chakra-ui/icons'
import Search from './Search';

function LeftsideBar() {
    const nagivate=useNavigate();
    const auth=useSelector((state)=>state.status);
    const userData=useSelector((state)=>state.userData);
    console.log(auth)
    const userlogout=()=>{
        logout().then(()=>{
          nagivate('/signin');
        }).catch((err)=>{
            console.log(err.message)
        })
    }
  return (
    <nav  className='bg-gray-500 hidden md:flex px-6 py-10 flex-col justify-between min-w-[70px] bg-dark-2 items-center'>
    <div className=' flex flex-col gap-11'>
        <Search>
         <AddIcon/>
        </Search>
       
    {/* <Link to='/' className='flex items-center gap-3'>
            <img src='/assets/images/logo.svg' alt='logo' width={170} height={36}/>
        </Link> */}
       
       
        {/* <div className='flex flex-col'>
            <p className='body-bold'>
                {userData.fullName}
            </p>
            <p className='small-regular'>
                @{userData.username}
            </p>
            </div>         */}
      
        {/* <ul className='flex flex-col gap-6'>
            {
                sidebarLink.map((sideLink)=>{
                    const isActive= pathname===sideLink.route;
                    return(
                        <li key={sideLink.label} className={`leftsidebar-link group ${isActive&&"bg-primary-500"}`}>
                            <NavLink to={sideLink.route} className='flex gap-4 items-center p-4'>
                                <img src={sideLink.imgURL} alt={sideLink.label}  className={`group-hover:invert-white${isActive&&" invert-white"}`}/>
                                <p className='body-bold'>{sideLink.label}</p>
                            </NavLink>
                        </li>
                    )
                })
            }
        </ul> */}
    </div>
   <div className='flex flex-col gap-11'>
     <Link to={`/profile/${userData._id}`} className='flex items-center gap-3'>
     <Avatar name={userData.fullName} src={userData.avatar} />
     </Link>
   
   <Button variant="ghost" color="blue" className='shad-button-ghost'
            onClick={()=>userlogout()}>
                {/* <img src='' alt=''/>
                <p className='small-medium lg:base-medium'>Logout</p> */}
                <ArrowForwardIcon/>
            </Button>
   </div>
    
</nav>
)
  
}

export default LeftsideBar