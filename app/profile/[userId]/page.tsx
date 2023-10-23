'use client'

import React, { useEffect, useState } from 'react'
import { getFirestore,  doc, getDoc  } from 'firebase/firestore';
import app from '../../shared/firebase.config';
import UserProfile from '@/app/components/userProfile';


export default function Profile({ params }: { params: { userId: string } }) {
  // get the firestore db instance through the exported firestore initialized app
  const db = getFirestore(app);
  const [userInfo, setUserInfo]  = useState({}); 

  useEffect(() => {
    const email = params.userId.replace('%40', '@'); 
    // console.log(`User Email id : ${email}`);

    if(params){
      getUserInfo(email); 
    }
  }, [params])

  const getUserInfo = async(email : string) => {
    const docRef = doc(db, "user", email);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setUserInfo(docSnap.data()); 
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    } 
  }
  
  return (
    <>
      {
        userInfo ? 
          <UserProfile userInfo = {userInfo}/>
        : null
      }
    </>
  )
}
