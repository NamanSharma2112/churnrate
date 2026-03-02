import React from 'react'
import { FiDollarSign, FiHome, FiLink, FiPaperclip, FiUser } from 'react-icons/fi'
import { IconType } from 'react-icons/lib'

const RouteSelect = () => {
  return (
    <div className='space-y-1 '>
      <Route Icon={FiHome} title='Dashboard' selected={true}  />
      <Route Icon={FiUser} title='Team' selected={false}  />
      <Route Icon={FiPaperclip} title='Invoices' selected={false} />
      <Route Icon={FiLink} title='Integrations' selected={false}  />
      <Route Icon={FiDollarSign} title='Finance' selected={false} />
    </div>
  )
}

export default RouteSelect


const Route = (
    {selected,
        Icon,
        title,
    }:{
        selected:boolean,
        Icon:IconType,
        title:string
    }
) => {
    return <button className={`flex items-center  gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,background-color] ${selected ? "bg-white text-stone-950 shadow" : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"}`}>
        <Icon/>
        <span>{title}</span>

    </button>
}