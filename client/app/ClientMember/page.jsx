"use client"
import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'

const ClientMember = async() => {
  const session = await getServerSession(options)
  return (
    <div
     className='relative left-80' 
     >
      <h1>Client Member page</h1>
      <p>{session?.user?.email}</p>
        <p>{session?.user?.role}</p>
     </div>
  )
}

export default ClientMember