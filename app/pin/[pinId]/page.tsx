'use client'

import { PinInfo } from '@/app/components/pinInfo'
import React from 'react'
import { useRouter } from 'next/navigation'
import { HiArrowSmallLeft, HiArrowLeft} from 'react-icons/hi2';
import {TiArrowLeftThick} from 'react-icons/ti'

export default function PinDetail() {
    const router=useRouter();

    return (
    <>
        <span className='border-4'>
            <TiArrowLeftThick className='text-[2.7rem] font-[22] ml-[1.5rem] 
                cursor-pointer hover:bg-gray-200 rounded-full p-2 mt-[0.2rem]'
                onClick={()=>router.back()}/>
        </span>
        <PinInfo/>
    </>
  )
}

