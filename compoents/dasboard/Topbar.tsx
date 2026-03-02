import React from 'react'
import RealTimeClock from './date'

const Topbar = () => {
  return (
  <div className="flex items-center justify-between border-b border-stone-300 px-4 pb-4 mb-4 mt-3">
  
  <h1 className="text-2xl font-bold text-stone-700">Dashboard</h1>
      
      <div className='flex justify-end text-stone-600 text-sm'><RealTimeClock />
      </div>
    </div>
  )
}

export default Topbar


