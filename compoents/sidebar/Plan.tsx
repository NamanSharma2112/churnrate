import React from 'react'

const Plan = () => {
  return (
    <div className='flex sticky top-[calc(100vh-48px-16px)] flex-col h-12 border-t px-2 border-stone-300 justify-end text-xs'>
      <div className='flex items-center justify-between'>
        <div>
           <p className='font-medium'>Enterprise</p>
           <p className='text-stone-500'>Pay as you go</p>

            </div>
   <button className='px-2 py-1.5 font-medium text-stone-500 hover:bg-stone-300 rounded transition-colors text-sm'>
    Support
   </button>
      </div>
    </div>
  )
}

export default Plan
