'use client'

import React, { useEffect, useState } from 'react'
import { getFirestore,  doc, getDoc, collection, query, where, getDocs  } from 'firebase/firestore';
import app from '../../shared/firebase.config';
import UserProfile from '@/app/components/userProfile';
import PinsList from '@/app/components/pinsList';
import PinterestPost from '@/app/types/pinterestPostType';
import User from '@/app/types/userType';

export default function Profile({ params }: { params: { userId: string } }) {
  // get the firestore db instance through the exported firestore initialized app
  const db = getFirestore(app);
  const [userInfo, setUserInfo]  = useState<User>({
    email: '',
    userImage: '',
    userName: ''
  }); 

  // typescript fix with any 
  const [listOfPin, setListOfPin] = useState<any>([])

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

  const getUserPins = async () : Promise<PinterestPost[]>=> {
    const pinterestPostRef = collection(db, 'pinterest-post');
    const queryRef = query(pinterestPostRef, where('postData.email', '==', userInfo.email));
    const matchingDocuments : PinterestPost[] = [];
  
    try {
      const querySnapshot = await getDocs(queryRef);
  
      querySnapshot.forEach((doc) => {
        const data = doc.data() as PinterestPost;
        // console.log(doc.id, '=> ', doc.data());
        
        matchingDocuments.push(data);
        // typescript fix
        // setListOfPin(()  => [...listOfPin, doc.data()])


        // Check for duplicate addition
        
        setListOfPin(() => {
          const newData = doc.data();
          const hasDuplicate = listOfPin.some((item : any) =>  {
            console.log('item : ',item.postData.email);
            console.log('postData : ', newData.postData.email);
            
            item.postData.email == newData.email
          });
          console.log(hasDuplicate);
          

          if (!hasDuplicate) {
            return [...listOfPin, newData];
          }
          return listOfPin;
        });

        

      });
      
      return matchingDocuments;
    } catch (error) {
      console.error('Error getting documents: ', error);
      throw error;
    }
  };
  
  
  
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
