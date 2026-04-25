import React from 'react'
import { useNavigate } from 'react-router'

function InfoContainer({lable, items , route,onClick}) {
    const navigate=useNavigate()
    const handleRoute=()=>{
        if(onClick){
            onClick();
        }
        else if (route){
            navigate(route)
        }
    }
  return (
    <div className='flex flex-col shadow-sm p-6 rounded-xl '>
        <div className='flex justify-between'>
            <h2 className='font-semibold text-lg'>{lable}</h2>
            <h1 className='text-blue-800 font-semibold cursor-pointer' onClick={handleRoute}>View All</h1>
        </div>
        <div>
            {items}
        </div>
    </div>
  )
}

export default InfoContainer