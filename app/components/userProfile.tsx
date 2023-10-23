import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
    
  const router = useRouter(); 
  const { data : session } = useSession(); 

  const onLogoutClickHandler = () => {
    console.log('Logout button clicked');
    signOut()
      .then(() => {
        console.log('Sign out successful');
        // ISSUE / BUG 
        // Can't push to the homepage. 
        router.push('/');
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  }
  


  return (
    <>
        <section className='flex flex-col items-center my-10'>
            {userInfo.userImage && (
              <Image
                alt="user-profile-picture"
                src={userInfo.userImage as string}
                height={100}
                width={100}
                className="rounded-full"
                priority={false} 
              />
            )}
            <div className='text-center mt-4'>
                <h2 className='font-semibold text-[2rem]'>{userInfo.userName}</h2>
                <h3 className='text-gray-400'>{userInfo.email}</h3>
            </div>
            <div className='flex gap-3'>
              <button 
                className='bg-gray-200 rounded-full py-2 px-3 font-semibold mt-5'>Share</button>
              {
                session?.user?.email === userInfo.email ? 
                  <button 
                    onClick={() => {onLogoutClickHandler()}}
                    className='bg-gray-200 rounded-full py-2 px-3 font-semibold mt-5'>Logout</button>
                : null
              }
            </div>
        </section>
    </>
  )
}
