"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';

export default function UserTag({user} : any) {
    //const {data:session}=useSession();
  return (
    <div className='overflow-hidden'>
       {user?
       <div className='flex gap-3 
       items-center'>
        <Image src={user.image} 
        alt='userImage'
        width={45}
        priority={true}
        height={45}
        className='rounded-full'
        />
        
        <div>
          <h2 className='text-[14px] font-medium'>{user.name}</h2>
          <h2 className='text-[0.5rem]'>{user.email}</h2>
        </div>
      </div>
       :null}
    </div>
  )
}
