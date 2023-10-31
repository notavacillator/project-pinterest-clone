import React from 'react'
import {PinterestPost} from '@/app/types/dataModelTypes';
import PinItem from './pinItem';

interface PinsListProps {
  listOfPins: PinterestPost[]; 
}

export default function PinsList(props: PinsListProps) {
  const { listOfPins } = props;
  console.log(listOfPins);
  
  
  return (
    <div className='mt-7 px-2 md:px-5
     columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 space-y-6 mx-[5rem]'>
        {listOfPins.map((item,index)=>(
          <PinItem key = {index} pin={item} />
        ))}
    </div>
  )
}
