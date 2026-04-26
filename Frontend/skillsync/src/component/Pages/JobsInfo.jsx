import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom';

import api from '../../utils/apiInstance'
import { APIpaths } from '../../utils/apiPath';

import { FaLocationDot } from "react-icons/fa6";

function JobsInfo() {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        if (!id) return;
        const fetchJob = async () => {
            try {
                const res = await api.get(APIpaths.JOB.GET_SINGLE_JOB(id))
                setJob(res.data.data)
            } catch (error) {
                toast.error(error.response.data.message || 'not able to fetch job')
            }
        }

        if (id) fetchJob()
    }, [id])

    if (!job) return <div className="p-6">Loading...</div>;

    const date = new Date(job.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
    })

    return (
        <div className='rounded-xl shadow-lg shadow-gray-300 m-6 mt-9 flex flex-col'>
            <div className='bg-blue-900 p-5 flex justify-between rounded-t-xl'>
                <div className='flex flex-col items-start'>
                    <p className='text-white font-semibold text-3xl'>{job.title}</p>
                    <p className='text-white text-xl mt-3'>{job.companyName}</p>

                    <div className='flex flex-col justify-end mt-1'>
                        <p className='text-gray-300 text-sm flex justify-center items-center gap-0.5'><FaLocationDot />{job.createdBy?.location}</p>
                        <p className='text-gray-300 text-sm'>{date}</p>
                    </div>

                    <div className='grid grid-cols-3 gap-2 mt-1.5'>
                        <p className='text-[10px] text-blue-700 font-semibold bg-blue-100 p-1 rounded-full border-blue-600 border text-center truncate'>{job.jobType}</p>
                        <p className='text-[10px] text-orange-800 font-semibold bg-orange-200 border-orange-600 border p-1 rounded-full text-center truncate'>{job.workMode}</p>
                        <p className='text-[10px] text-green-700 font-semibold bg-green-300  border-green-800 border p-1 rounded-full text-center truncate'>{job.experienceLevel}</p>
                    </div>

                    <button className='bg-white shadow-sm rounded-3xl p-1 px-4 font-semibold text-[17px] mt-3.5 cursor-pointer hover:bg-gray-200 '>Apply</button>
                </div>
                <img src={job.logo} alt='logo' className='rounded-full w-48 h-48 ' />
            </div>

            <div className='p-5'>
                <h1 className='font-semibold text-lg'>Job Description :</h1>
                <p className='text-gray-700'>{job.description}</p>
            </div>

            <div className='p-5'>
                <h1 className='font-semibold text-lg'>Job Requirements :</h1>
                <ul className='list-disc list-inside flex flex-col gap-1 mt-2'>
                    {job.requirement?.map((item, i) => (
                        <li key={i} className='text-gray-700'>{item}</li>
                    ))}
                </ul>
            </div>

            {job.DataFile && (
                <div className="p-6 pt-0">
                    <h1 className='font-semibold text-lg mb-2'>More Information</h1>

                    <div className="flex items-center justify-between border rounded-xl p-4 bg-gray-50">
                        <p className="text-sm text-gray-600 truncate max-w-[70%]">
                            Attachment available
                        </p>

                        <a
                            href={job.DataFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-950 transition"
                        >
                            Open File
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default JobsInfo