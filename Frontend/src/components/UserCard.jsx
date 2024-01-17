import React from 'react'

function UserCard({user}) {
  return (
    <div className='flex flex-row w-full gap-3 m-5'>
        <div className="image">
            <img src={user.profilePic} alt="profile" className='w-20 h-20 rounded-full object-cover'/>
        </div>
        <div className="content">
            <h2>{user.fullName}</h2>
        </div>
    </div>
  )
}

export default UserCard