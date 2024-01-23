import getCurrentUser from '@/actions/GetUser'
import React from 'react'
import Button from './Button'
const Admin = async() => {
    const session = await getCurrentUser()

    // if(session?.role === "USER"){
    //     return redirect("/")
    // }
  return (
    <div className='w-full flex items-center justify-center mt-10'>
      <div className=''>
       <Button/>
      </div>
    </div>
  )
}

export default Admin
