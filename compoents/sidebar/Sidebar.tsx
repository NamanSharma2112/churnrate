"use client"
import React from 'react'
import AccountToggle from './AccountToggle'
import Search from './Search'
import RouteSelect from './RouteSelect'
import Plan from './Plan'

const Sidebar = () => {
  return (
    <div>
      <div className='  sticky top-4 h-[calc(100vh-32px-48px)]  '>
        
        <AccountToggle />
        <Search />
        <RouteSelect />
      </div>
        <Plan />
    </div>
  )
}

export default Sidebar
