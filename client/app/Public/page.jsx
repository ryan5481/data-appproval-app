// "use client"
// import { getServerSession } from 'next-auth'
import React from 'react'
// import { options } from '../api/auth/[...nextauth]/options'
// import { redirect } from 'next/navigation'

const Submissions = async () => {
  // const session = await getServerSession(options)

  // if(!session){
  //   redirect("/api/auth/signin?callbackUrl=/user")
  // }
  return (
    <div
    className='relative left-80' 
    >
        <h1>Public Page</h1>
        {/* <p>{session?.user?.email}</p>
        <p>{session?.user?.role}</p> */}
      </div>
  )
}

export default Submissions