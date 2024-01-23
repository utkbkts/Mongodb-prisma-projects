import Link from 'next/link'
import React from 'react'

const Notfound = () => {
  return (
    <div className='notfound'>
    <div className='flex-1 gap-14 flex flex-col'>
        <h1 className='text-5xl'>Oppss!!!</h1>
        <p className='text-3xl text-red-300'>I think you're lost</p>
        <Link href={"/"}><button className='bg-red-500 text-white w-[400px] h-12 rounded-xl hover:bg-red-600 transition-all duration-300'>Click to go to the home page</button></Link>
    </div>
    <div className='flex-1'>
        <img src={"/Notfound.jpg"} alt="" />
    </div>
</div>
  )
}

export default Notfound
