import Image from 'next/image'
import React from 'react'

const MakeWorkEasy = () => {
    return (
        <div className='relative h-[250px] md:h-[450px] bg-white'>
            <Image src={"/images/make-work-easy.png"} alt='make-work-easy' fill className='h-72 w-full object-contain' />

        </div>
    )
}

export default MakeWorkEasy