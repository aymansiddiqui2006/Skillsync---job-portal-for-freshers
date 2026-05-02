import React from 'react'
import { useNavigate } from 'react-router-dom'

function JobContainer({ logo, title, date, description, jobType, experienceLevel, workMode, name, active, route }) {

    const role = localStorage.getItem('role');
    const isRecruiter=role==='recruiter'
    const formattedDate = date
        ? new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
        })
        : "";

    const navigate=useNavigate()

    const handleRoute =() => {
        if (!route) return;
        else{
            
            isRecruiter?navigate(`/recruiter/jobs/${route}`):navigate(`/user/jobs/${route}`)
        }
    }

    return (
        <div className='flex flex-col shrink-0  snap-start shadow-sm w-60 min-h-44 p-4 rounded-2xl hover:shadow-gray-400 hover:shadow-lg cursor-pointer mt-3.5 transition ' onClick={handleRoute}>
            <div className='flex justify-between'>
                <img
                    src={logo || "/fallback.png"}
                    alt="company"
                    className="w-12 h-12 rounded object-cover"
                />
                <div className='text-sm font-medium text-gray-600'>{formattedDate}</div>
            </div>
            <h1 className='text-lg font-medium mt-2'>{title}</h1>
            <h2 className='text-sm font-medium text-gray-600 line-clamp-1'>{description}</h2>
            {
                name &&
                <h1 className='text-sm font-medium mt-2 text-gray-500'>By: {name}</h1>
            }
            {typeof active === "boolean" && (
                <div className='flex items-start mt-2'>
                    <p
                        className={`text-[10px] p-1 px-3 rounded-[10px] border text-center ${active
                            ? "text-green-800 bg-green-300/85 border-green-600"
                            : "text-gray-700 bg-gray-300/85 border-gray-500"
                            }`}
                    >
                        {active ? "Active" : "Closed"}
                    </p>
                </div>
            )}


            <div className='grid grid-cols-3 gap-2 mt-5'>
                <p className='text-[10px] text-blue-700 font-semibold bg-blue-100 p-1 rounded-full border-blue-600 border text-center truncate'>{jobType}</p>
                <p className='text-[10px] text-orange-800 font-semibold bg-orange-200 border-orange-600 border p-1 rounded-full text-center truncate'>{workMode}</p>
                <p className='text-[10px] text-green-700 font-semibold bg-green-300  border-green-800 border p-1 rounded-full text-center truncate'>{experienceLevel}</p>
            </div>

        </div>
    )
}

export default JobContainer