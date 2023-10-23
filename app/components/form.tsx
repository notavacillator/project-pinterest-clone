'use client'

import React, { useState } from 'react'
import UploadImage from './uploadImage'
import { useSession } from 'next-auth/react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import app from '../shared/firebase.config';
import { doc, setDoc } from "firebase/firestore"; 

export default function Form() {
    const [file, setFile]=useState<File>();
    const { data : session }  = useSession()

    // state data for the text form 
    const [title, setTitle] = useState(""); 
    const [desc, setDesc] = useState(""); 
    const [destinationLink, setDestinationLink] = useState(""); 

    // function runs on save 
    const onSave = () => {
        // console.log(`title : ${title}, desc : ${desc}, link : ${destinationLink}`);
        // console.log(file);

        uploadImageFile(); 
    }

    // create firebase storage root reference. 
    const storage = getStorage(app);

    // get firestore db instance 
    const db = getFirestore(app);

    // Use current data timestamp as the id for saving the posts in firestore
    const postId = Date.now().toString(); 

    // function to upload file / image to firebase storage 
    const uploadImageFile = () => {
        if(file !== undefined){
            // Create a reference to the selected image to be uploaded 
            const storageRef = ref(storage, `pinterest/${file.name}`)

            // 'file' comes from the Blob or File API
            /* This uploads the file to the Firebase Storage at the location specified by storageRef. 
            The then block handles the upload's success.  */
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file! with snapshot : ' +  snapshot);
                console.log(snapshot);
                
                console.log('file info: ' +  file);
                console.log(file);
            })
            .then((resp) => {
                /* This retrieves the download URL for the uploaded file. 
                The URL is used to access the uploaded file later. */
                getDownloadURL(storageRef)
                .then( async(url) => {
                    console.log('Download URL : ', url);
                    /* This prepares an object postData that contains information about the file upload, 
                    including title, desc, destinationLink, and image (the download URL). */
                    const postData = {
                        title,
                        desc,
                        destinationLink,
                        image: url,
                        username : session?.user?.name,
                        email: session?.user?.email,
                        userImage : session?.user?.image
                    }

                    // Add a new document in collection "cities"
                    /*  This saves the postData object as a new document in a Firestore collection named "pinterest-post," 
                    using the postId as the document's identifier. It waits for the Firestore write 
                    operation to complete before proceeding. */
                    await setDoc(doc(db, "pinterest-post", postId), {
                        postData
                    })
                    .then((res) => {
                        console.log("Data saved in firestore. ");
                        
                    })
                })
            })
        } else {
            console.error('error in uploadImageFile file is undefined. ');
        }
    }

  return (
    <>
        <section className='bg-slate-50 p-[3rem] rounded-2xl my-[1rem]'>
            {/* Save pin button */}
            <div className='flex justify-end mb-5'>
                <button className='py-2 px-3 bg-[#DD403A] rounded-md font-semibold text-slate-50'
                    onClick={() => onSave()}
                >
                    Save
                </button>
            </div>
            {/* Main form section */}
            <div className="flex flex-col md:flex-row flex-wrap gap-1">
                {/* Upload Image component  */}
                <div className="basis-4/12 grow">
                    <UploadImage setFile={(file: any) => setFile(file)} />
                </div>
                {/* Text form section */}
                <div className="basis-6/12 grow-0 shrink p-[1rem]">
                    <input type="text" placeholder='Add your title' 
                        className='text-4xl border-b-2 bg-transparent font-bold p-3 outline-none placeholder:text-slate-500 text-slate-800'
                        onChange={(e) => {
                            e?.target?.value && setTitle(e.target.value);
                        }}
                    />    
                    <p className='mt-1 text-xs text-slate-500 mb-[1rem]'>The first 40 Charaters are 
                        what usually show up in feeds</p>
                    {/* User tag component */}
                    {/* <UserTag user={session?.user} /> */}
                    {/* Textarea */}
                    <textarea
                        placeholder='Tell everyone what your pin is about' 
                        className=' outline-none  w-full mt-8 pb-4 text-[14px]
                        border-b-[2px] placeholder-gray-400 bg-transparent mb-[4rem]'
                        onChange={(e) => {
                            e?.target?.value && setDesc(e.target.value);
                        }}
                    />
                    <input type="text" placeholder='Add a destination link' 
                        className=' border-b-2 bg-transparent text-[14px] 
                        placeholder-gray-400 p-3 outline-none  text-slate-800 w-full'
                        onChange={(e) => {
                            e?.target?.value && setDestinationLink(e.target.value);
                        }}    
                    />    

                </div>
            </div>

        </section>
    </>
  )
}
