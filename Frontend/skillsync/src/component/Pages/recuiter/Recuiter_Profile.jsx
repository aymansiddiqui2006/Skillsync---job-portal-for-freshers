import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext';
import { FaEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

import Profile_Update from './Profile_Update.jsx'

import Model from '../../Model';


function Recuiter_Profile() {

    const { user } = useContext(UserContext)


    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const[openModel,setOpenModel]=useState(false);



    return (
        <>
            <nav className='bg-[#00296d] w-full h-20 px-10 flex items-center justify-between  top-0 z-50 font-serif mb-2 shadow-gray-300 shadow-lg' />

            <div className=" py-8 px-6 flex justify-center">
                <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-6xl flex justify-between">

                    {/* LEFT PROFILE SECTION */}
                    <div className="flex gap-6">

                        {/* Avatar */}
                        <div className="relative flex flex-col items-center gap-2">
                            <img
                                src={
                                    user?.avatar ||
                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                }
                                alt="avatar"
                                className="h-32 w-32 rounded-full border-4 border-gray-200 object-cover"
                            />
                            <div>{user?.role}</div>

                        </div>

                        {/* USER INFO */}
                        <div className="space-y-3">

                            <h1 className="text-2xl font-semibold">{user?.username}</h1>

                            <p className="text-gray-500 text-sm">
                                Profile last updated -{" "}
                                {user?.updatedAt ? formatDate(user.updatedAt) : ""}
                            </p>

                            <hr />

                            <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">

                                <div className='flex items-center gap-2'>
                                    <div><FaLocationDot /></div>
                                    <div onClick={()=>setOpenModel(true)} className='cursor-pointer'> Add location </div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <div><FaPhoneAlt /></div>
                                    <div onClick={()=>setOpenModel(true)} className='cursor-pointer'>  Add mobile number </div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <div><IoMdPerson /></div>
                                    <div onClick={()=>setOpenModel(true)} className='cursor-pointer'
                                        > Add availability to join </div>
                                </div>

                                <Model
                                    isOpen={openModel}
                                    onClose={()=>setOpenModel(false)}
                                    title={"Basic Details"}
                                >
                                    <Profile_Update/>
                                </Model>



                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>

    )
}

export default Recuiter_Profile