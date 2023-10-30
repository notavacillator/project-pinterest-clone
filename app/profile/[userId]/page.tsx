'use client'

import React, { useEffect, useState } from 'react'
import { getFirestore,  doc, getDoc, collection, query, where, getDocs  } from 'firebase/firestore';
import app from '../../shared/firebase.config';
import UserProfile from '@/app/components/userProfile';
import PinsList from '@/app/components/pinsList';
import {User, PinterestPost, PostData} from '@/app/types/dataModelTypes';

export default function Profile({ params }: { params: { userId: string } }) {
  // get the firestore db instance through the exported firestore initialized app
  const db = getFirestore(app);
  const [userInfo, setUserInfo]  = useState<User>({
    email: '',
    userImage: '',
    userName: ''
  }); 

  // typescript fix with any 
  const [listOfPin, setListOfPin] = useState<PinterestPost[]>([])

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
      setUserInfo(docSnap.data() as User); 
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    } 
  }


  useEffect(()=>{
    if(userInfo)
    {
      getUserPins();
    }
  },[userInfo])
  
  const getUserPins=async()=>{
    setListOfPin([])
      const q=query(collection(db,'pinterest-post')
      ,where("email",'==',userInfo.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    
      setListOfPin(listOfPins => [...listOfPins, doc.data()] as PinterestPost[]);
    });
  }
  
  
  return (
    <>
      {
        userInfo ? 
          <>
            <UserProfile userInfo = {userInfo}/>
            <PinsList/>
            <button onClick={() => getUserPins()}>Here</button>
            {/* <h2>List of pin {listOfPin.map(() => {})}</h2> */}
          </>
        : null
      }
    </>
  )
}
