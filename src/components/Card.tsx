import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import { Rating } from '@mui/material'

export default function ProductCard ( {venueName, imgSrc} :  {venueName: string, imgSrc: string} ) {

    return (
        <InteractiveCard contentName={venueName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                objectFit='cover'
                className='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full h-[15%] p-[10px]'>{venueName}</div>
            <Rating id={venueName + " Rating"} name={venueName + " Rating"} data-testid={venueName + " Rating"} className=' h-[10%] px-2 py-1' />
        </InteractiveCard>
    )
}

