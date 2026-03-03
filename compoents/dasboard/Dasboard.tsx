import React from 'react'
import Topbar from './Topbar'
import Grid from './Grid'
import Activity from './charts/Activity'
const Dasboard = () => {
  return (
    <div className='bg-neutral-50 rounded-lg pb-6 shadow-md h-[200vh]'>
      <Topbar />
      <Grid />

     
    </div>
  )
}

export default Dasboard
