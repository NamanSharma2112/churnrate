import React from 'react'
import Image from 'next/image'
import image from '../../app/store/image.png'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
const AccountToggle = () => {
  return (
    <div className='border-b mb-4 mt-2 pb-4 border-stone-300'>
      <button className='flex p-0.5 hover:bg-stone-200 rounded  transition-[300ms] relative gap-2 w-full item-center'>
        <Image src={image} alt='IMAGE'  className='size-10 rounded-4xl shrink-0  shadow ' />
        <div className='text-start'>
            <span className='text-sm font-medium block'>Naman Sharma</span>
            <span className='text-xs block text-stone-500'>namansharma.com</span>
        </div>
        <FiChevronDown className='absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs' />
         <FiChevronUp className='absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs' />
      </button>
    </div>
  )
}

export default AccountToggle
