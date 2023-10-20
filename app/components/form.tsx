'use client'

import React, { useState } from 'react'
import UploadImage from './uploadImage'

export default function Form() {
    const [file,setFile]=useState();
  return (
    <>
        <section className='bg-slate-50 p-[3rem] rounded-2xl my-[1rem]'>
            {/* Save pin button */}
            <div className='flex justify-end mb-5'>
                <button className='py-2 px-3 bg-[#DD403A] rounded-md font-semibold text-slate-50'>Save</button>
            </div>
            {/* Main form section */}
            <div className="flex flex-col md:flex-row flex-wrap gap-1">
                {/* Upload Image component  */}
                <div className="basis-4/12 grow">
                    <UploadImage setFile={(file: any) =>setFile(file)} />
                </div>
                {/* Text form section */}
                <div className="basis-6/12 grow-0 shrink">
                    <input type="text" placeholder='Add your title' 
                        className='text-4xl border-b-2 bg-transparent font-bold p-3 outline-none placeholder:text-slate-500 text-slate-800'/>    
                    <p className='text-xs text-slate-500 mb-[1rem]'>The first 40 Charaters are 
                        what usually show up in feeds</p>
                    {/* User tag component */}
                    {/* <UserTag user={session?.user} /> */}
                    {/* Textarea */}
                    <textarea
                        placeholder='Tell everyone what your pin is about' 
                        className=' outline-none  w-full mt-8 pb-4 text-[14px]
                        border-b-[2px] placeholder-gray-400 bg-transparent mb-[4rem]'/>
                    <input type="text" placeholder='Add a destination link' 
                        className=' border-b-2 bg-transparent text-[14px] placeholder-gray-400 p-3 outline-none  text-slate-800 w-full'/>    

                </div>
            </div>

        </section>
    </>
  )
}
