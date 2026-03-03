import React from 'react'
import StatCard from './StatCard'
import Activity from './charts/Activity'
import Risk from './charts/Risk'
const Grid = () => {
  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
      <StatCard />
     <Activity />
     <Risk/>
    </div>
  )
}

export default Grid
