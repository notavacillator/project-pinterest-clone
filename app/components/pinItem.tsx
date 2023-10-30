import Image from 'next/image';
import React from 'react'
import UserTag from './userTag';
import { useRouter } from 'next/navigation';
import { PinterestPost } from '../types/dataModelTypes';

interface PinProps {
    pin: PinterestPost; 
  }

export default function PinItem({pin} : PinProps) {
    const router=useRouter();
    const user={
        name:pin?.postData.username,
        image:pin?.postData.userImage
    }
  return (
    <div className=''>
       <div className="relative 
       before:absolute
       before:h-full before:w-full
       before:rounded-3xl
       before:z-10
       hover:before:bg-gray-600 
       before:opacity-50
       cursor-pointer
       " onClick={()=>router.push("/pin/"+pin.postData.email)}>
       
        <Image src={pin.postData.image}
        alt={pin.postData.title}
        priority={true}
        width={500}
        height={500}
        className='rounded-3xl 
        cursor-pointer relative z-0'
        />
       </div>
        <h2 className='font-bold 
        text-[18px] mb-1 mt-2 line-clamp-2'>{pin.postData.title}</h2>
        <UserTag user={user} />
    </div>
  )
}
