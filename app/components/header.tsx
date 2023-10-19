'use client'

import Image from 'next/image'
import React, {useEffect} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { HiSearch, HiBell, HiChat} from "react-icons/hi";
import { getFirestore } from 'firebase/firestore';
import app from '../shared/firebase.config';
import { setDoc, doc} from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { data: session } = useSession();
    const db = getFirestore(app);
    const router = useRouter()

    useEffect(() => {
        saveUserInfo();
    }, [session])
    

    const saveUserInfo = async() => {
        const userEmail = session?.user?.email;

        if(userEmail){
            const userDocRef = doc(db, 'user', userEmail);

            // Use nullish coalescing to handle potential undefined session.user
            const userName = session.user?.name ?? 'Unknown Name';
            const userImage = session.user?.image ?? '';

            await setDoc(userDocRef, {
                userName,
                email: userEmail,
                userImage
            });
        }
    }

  return (
    <div className='flex gap-5 md:gap-2 items-center p-3 justify-between'>
        <Image src = '/pinterest-logo.png' alt='logo' height={50} width={50}
            className='hover:bg-gray-200 p-[0.5rem] rounded-full cursor-pointer'>
        </Image>
        <div className='flex'>
            <button
                onClick={() => {router.push('/')}} 
                className='bg-gray-900 text-white p-[0.5rem] rounded-full px-4'>Home</button>
            <button className='p-[0.5rem] rounded-full px-4 font-semibold'>Create</button>
        </div>
        <div className='bg-gray-200 hidden sm:flex rounded-full p-3 gap-3 items-center flex-grow lg:mx-[5rem] xl:mx-[10rem]'>
            <HiSearch className = 'text-2xl text-gray-500 '/>
            <input type="text" name="" id="" placeholder='Search' 
            className='bg-transparent outline-none w-full'/>
        </div>
        <HiBell className= 'text-[40px] text-gray-500 hidden md:block hover:bg-gray-200 p-[0.5rem] rounded-full cursor-pointer'/>
        <HiChat className= 'text-[40px] text-gray-500 hidden md:block hover:bg-gray-200 p-[0.5rem] rounded-full cursor-pointer'/>
        {
            session?.user? 
            <Image src= {session?.user?.image as string} 
                onClick={() => {
                    router.push('/profile' + '/' + session.user?.email)
                }}
                alt='profile-picture' height={50} width={50}
                className='rounded-full p-[0.5rem] hover:bg-gray-200 cursor-pointer'
            />
            :
            <button onClick={() => signIn()} className='p-[0.5rem] rounded-full px-4 font-semibold'>Login</button>
        }
        
        
    </div>
  )
}
