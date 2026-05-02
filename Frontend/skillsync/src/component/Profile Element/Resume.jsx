import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../../utils/apiInstance';
import { APIpaths } from '../../utils/apiPath';
import Model from '../Model.jsx';

import { MdDelete } from "react-icons/md";

import UserContext from "../context/UserContext.jsx"


function Resume() {
    const { user, setUser } = useContext(UserContext);
    const [openModel, setOpenModel] = useState(false);

    const [File, setFile] = useState(user?.resume || null);



    const handleResumeUpload = async (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("resume", file);

        try {
            const res = await api.patch(APIpaths.CHANGE.UPLOAD_RESUME, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })

            const updatedUser = res.data.data;

            setUser(updatedUser);

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );
            toast.success(res?.data?.message || "file uploaded Succesfully")
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    const handleDelete = async () => {
        try {
            setFile(null);
            toast.success("Resume removed")
        } catch (error) {
            toast.error("Failed to delete resume", error);
        }
    }


    return (
        <div className='bg-white shadow-gray-300 shadow-xl rounded-xl py-3 px-12'>
            <h1 className='font-medium text-xl items-start'>Resume</h1>
            <div className=' border-dotted border-2 border-gray-500 rounded-lg py-28 px-48 mt-8 overflow-hidden'>
                <div className='text-lg flex gap-2'>
                    Already Have Resume ?
                    <p className='cursor-pointer font-semibold text-blue-700 text-lg' onClick={() => setOpenModel(true)}>Upload Resume</p>
                </div>
                <p className='text-gray-600 font-normal text-sm'>Supported Formats: doc, docx, rtf, pdf, upto 2 MB</p>

                {
                    File &&
                    <div>{user.resume}</div>
                }

            </div>

            <Model
                isOpen={openModel}
                onClose={() => setOpenModel(false)}
                title={"Upload Resume"} >
                <input type='file' onChange={handleResumeUpload} />

                {File && (
                    <div className='mt-4 flex items-center justify-between bg-gray-100 border border-gray-300 px-3 py-2 rounded-md group'>
                        {/* Container for the filename with truncation logic */}
                        <div className='flex flex-col min-w-0 flex-1'>
                            <span className='text-xs text-gray-500 uppercase font-bold'>Current File</span>
                            <p className='text-sm text-blue-700 font-medium truncate pr-2'>
                                {File}
                            </p>
                        </div>

                        {/* Delete Icon with hover effect */}
                        <button
                            onClick={handleDelete}
                            className='p-1.5 hover:bg-red-100 rounded-full transition-colors'
                            title="Remove Resume"
                        >
                            <MdDelete className='text-red-500 text-xl cursor-pointer' />
                        </button>
                    </div>
                )}

            </Model>
        </div>
    )
}

export default Resume