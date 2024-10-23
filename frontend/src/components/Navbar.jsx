import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
            <img onClick={() => navigate(-1)} src={assets.arrow_left} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' alt="" />
            <img onClick={() => navigate(1)} src={assets.arrow_right} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' alt="" />
        </div>
        <div className='flex items-center gap-4'>
            <p className='cursor-pointer bg-white text-black text-base px-4 py-1 rounded-2xl hidden md:block'>Explore Premium</p>
            <p className='bg-black py-1 px-3 rounded-2xl cursor-pointer text-base'>Install App</p>
            <p className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center'>A</p>
        </div>
      </div> 
      <div className='flex items-center gap-2 mt-4'>
        <p className='bg-white cursor-pointer text-black px-4 py-1 rounded-2xl'>All</p>
        <p className='bg-black cursor-pointer px-4 py-1 rounded-2xl'>Music</p>
        <p className='bg-black cursor-pointer px-4 py-1 rounded-2xl'>Podcasts</p>
      </div>
    </>
  )
}

export default Navbar
