import Image from 'next/image'
import React from 'react'
import { HiSearch, HiBell, HiChat} from "react-icons/hi";

export default function Header() {
  return (
    <div className='flex gap-3 md:gap-2 items-center p-3 justify-between'>
        <Image src = '/pinterest-logo.png' alt='logo' height={50} width={50}
            className='hover:bg-gray-200 p-[0.5rem] rounded-full cursor-pointer'>
        </Image>
        <div>
            <button className='bg-gray-900 text-white p-[0.5rem] rounded-full px-4'>Home</button>
            <button className='p-[0.5rem] rounded-full px-4 font-semibold'>Create</button>
        </div>
        <div className='bg-gray-200 hidden sm:flex rounded-full p-3 gap-3 items-center flex-grow'>
            <HiSearch className = 'text-2xl text-gray-500 '/>
            <input type="text" name="" id="" placeholder='Search' 
            className='bg-transparent outline-none'/>
        </div>
        <HiBell className= 'text-[40px] text-gray-500 hidden md:block hover:bg-gray-200 p-[0.5rem] rounded-full cursor-pointer'/>
        <HiChat className= 'text-[40px] text-gray-500 hidden md:block hover:bg-gray-200 p-[0.5rem] rounded-full cursor-pointer'/>
        <Image src= '/profile-picture-image.jpg' alt='profile-picture' height={50} width={50}
            className='rounded-full p-[0.5rem] hover:bg-gray-200 cursor-pointer'
        />
    </div>
  )
}
