import React from 'react'
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi'

const StatCard = () => {
  return  <>
      <Card
       title= "Churn Rate"
      value= "2.4%"
      pillText= "-0.3%"
      trend= "down"      // down is good for churn rate
      period= "vs last month"
      
      
      />
      <Card 
      title="Revenue Churn"
      value="$1,234"
      pillText="+5.2%"
      trend="up"
      period="this quarter"
      />
      <Card
      title= "Active Customers"
      value= "1,847"
      pillText= "+124"
      trend= "up"        
      period ="new this month"
      />
      
    </>
  
}

export default StatCard


const Card = (
    {
        title,
        value,
        pillText,
        trend,
        period,}: {
        title?: string;
        value?: string;
        pillText?: string;
        trend?: "up" | "down";
        period?: string;
    }
) => {
  return (
    <div className=' p-4 bg-stone-100 border border-zinc-200 col-span-4 text-stone-800 rounded-lg shadow-md'>     
        <div className='text-sm text-gray-600'>{title}</div>
        <div className='text-2xl font-bold'>{value}</div>
        <span className='flex items-center gap-2 mt-1'>
            <span className={`text-xs font-semibold px-5 py-1 rounded-4xl ${trend === "up" ? "bg-green-100  text-green-800"  : "bg-red-100 text-red-800"}
           
            `}>
                
                {pillText}
            </span>
            <div className='text-xs text-gray-400'>{period}</div>
        </span>

    </div>
    )
}
