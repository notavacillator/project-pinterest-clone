'use client'

import { useEffect, useState } from "react";
import { PinterestPost, User } from "./types/dataModelTypes";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./shared/firebase.config";
import PinsList from "./components/pinsList";


export default function Home() {
  const [listOfPin, setListOfPin] = useState<PinterestPost[]>([])
  const db = getFirestore(app);

  useEffect(()=>{
    getAllPins();
  },[])
  
  const getAllPins = async () => {
    setListOfPin([]);
    const q = query(collection(db, 'pinterest-post'), where('postData.email', '!=', ''));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data());
      setListOfPin((listOfPins) => [...listOfPins, doc.data()] as PinterestPost[]);
      
    });
  };

  // console.log(listOfPin);
  
  
  return (
    
  <>
    <main className="p-3">
      <PinsList listOfPins = {listOfPin}/>
    </main>
  </>
  )
}
