import Image from 'next/image';
import React from 'react'

type UserInfo = {
    email?: string;
    userImage?: string;
    userName?: string;
  };

type UserProfileProps = {
    userInfo: UserInfo;
};

export default function UserProfile({ userInfo }: UserProfileProps) {
    
  return (
    <>
        <section className='flex flex-col items-center my-10'>
            <Image 
                alt='user-profile-picture' 
                src={userInfo.userImage as string} 
                height={100} width={100} 
                className='rounded-full'
            />
            <div className='text-center mt-4'>
                <h2 className='font-semibold text-[2rem]'>{userInfo.userName}</h2>
                <h3 className='text-gray-400'>{userInfo.email}</h3>
            </div>
            <button className='bg-gray-200 rounded-full py-2 px-3 font-semibold mt-5'>Share</button>
        </section>
    </>
  )
}
