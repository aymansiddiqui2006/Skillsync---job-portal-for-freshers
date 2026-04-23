import React, { useContext, useState } from 'react'
import { Link } from 'react-scroll';
import UserContext from '../../context/UserContext';

import { FaEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

import Profile_Update from '../../Profile Element/Profile_Update.jsx'

import Model from '../../Model';
import Resume from '../../Profile Element/Resume.jsx';
import DeleteUser from '../../Profile Element/DeleteUser.jsx'
import ProfileSummary from '../../Profile Element/ProfileSummary.jsx'


function Recuiter_Profile() {

    const { user } = useContext(UserContext)


    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const [openModel, setOpenModel] = useState(false);



    return (
        <div>
            <nav className='bg-[#00296d] w-full h-20 px-10 flex items-center justify-between  top-0 z-50 font-serif mb-2 shadow-gray-300 shadow-lg' />

            <div className="py-8 px-6 flex justify-center flex-col items-center gap-5">

                {/* upper main info */}
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
                            <div className='text-blue-700 font-medium cursor-pointer hover:underline' onClick={() => setOpenModel(true)}>Edit</div>
                            <div>{user?.role}</div>

                        </div>

                        {/* USER INFO */}
                        <div className="space-y-3">

                            <h1 className="text-2xl font-semibold">{user?.fullname}</h1>

                            <p className="text-gray-500 text-sm">
                                Profile last updated -{" "}
                                {user?.updatedAt ? formatDate(user.updatedAt) : ""}
                            </p>

                            <hr />

                            <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">

                                <div className='flex items-center gap-2'>
                                    <div><FaLocationDot /></div>
                                    <div > {user.location || "Add location"} </div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <div><FaPhoneAlt /></div>
                                    <div>{user.contact || "Add mobile number "}</div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <div><IoMdPerson /></div>
                                    <div> Add availability to join </div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <div><FaPhoneAlt /></div>
                                    <div >{user.skills || "Add skills"}</div>
                                </div>






                                <Model
                                    isOpen={openModel}
                                    onClose={() => setOpenModel(false)}
                                    title={"Basic Details"}
                                >
                                    <Profile_Update onClose={() => setOpenModel(false)} />
                                </Model>



                            </div>
                        </div>
                    </div>


                </div>

                <div className='flex gap-16 '>

                    {/* left side */}
                    <div className=" shadow-gray-300 rounded-xl bg-white shadow-xl flex flex-col px-7 py-4 w-60 border-gray-400">
                        <h4 className='font-medium text-xl items-start mb-5'>Quick Edit</h4>

                        <div className='flex justify-between rounded-2xl hover:bg-gray-200 p-2 text-base '>
                            Resume
                            <Link to='resume' smooth={true} duration={500} className='cursor-pointer font-medium text-blue-700' >upload</Link>
                        </div>

                        <div className='flex justify-between rounded-2xl hover:bg-gray-200 p-2 text-base '>
                            profile Summary
                            <Link to='ProfileSummary' smooth={true} duration={500} className='cursor-pointer font-medium text-blue-700' >add</Link>
                        </div>

                        <div className='flex justify-between rounded-2xl hover:bg-gray-200 p-2 text-base '>
                            Delete Account
                            <Link to='delete' smooth={true} duration={500} className='cursor-pointer font-medium text-red-600'>delete</Link>
                        </div>
                    </div>

                    {/* right side */}
                    <main className=' flex flex-col gap-10'>

                        {/* Resume */}
                        <div id='resume'>
                            <Resume />
                        </div>

                        {/* Profile summary */}
                        <div id='ProfileSummary'>
                            <ProfileSummary />
                        </div>

                        <div id='delete'>
                            <DeleteUser />
                        </div>


                    </main>

                </div>

            </div>



        </div>
    )
}

export default Recuiter_Profile