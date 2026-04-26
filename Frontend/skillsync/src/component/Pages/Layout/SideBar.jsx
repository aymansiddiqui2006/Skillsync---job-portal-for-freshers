import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegFolder } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa6";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { MdOutlineFolderCopy } from "react-icons/md";
import { MdFolderCopy } from "react-icons/md";
import { RiFolderReceivedLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";



import React, { useContext, useState } from 'react'
import MenuButton from '../../elements/sidebar/MenuButton.jsx'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

import UserContext from "../../context/UserContext.jsx";

import Model from '../../Model.jsx'

import { APIpaths } from '../../../utils/apiPath.js'
import api from '../../../utils/apiInstance.js'


function SideBar() {
    const navigate = useNavigate()

    const { user, setUser } = useContext(UserContext);

    const [error, setError] = useState('')

    const [openApplications, setOpenApplications] = useState(false)

    const [openModel, setOpenModel] = useState(false);

    const handleLogout = async () => {
        console.log("Logout clicked");

        try {

            await api.post(APIpaths.AUTH.LOGOUT, {}, { withCredentials: true });
            setUser(null);
            toast.success("Logged out successfully")

            setOpenModel(false);

            navigate("/login");

        } catch (error) {
            setError(error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Something went wrong")

            toast.error("account failed to logout")
        }
    }


    return (
        <div className="flex flex-col gap-6 w-72 h-screen px-6 py-8 bg-white shadow-lg  shadow-gray-400 relative">

            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-2">
                <img
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow"
                    src={user?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt="avatar"
                />
                <p className="text-gray-700 font-semibold text-lg">
                    {user?.username || "User"}
                </p>
                <p className="text-gray-600 font-semibold text-sm">
                    {user?.role || "User"}
                </p>
            </div>

            {/* Menu Section */}
            <div className="flex flex-col gap-2 w-full">

                <MenuButton icon={<MdOutlineSpaceDashboard />} label={"Dashboard"} route={'/recruiter'} activeIcon={<MdSpaceDashboard />}  />



                <MenuButton icon={<FaRegFolder />} label={"Jobs"} route={'/jobs'} activeIcon={<FaFolder />} />


                <MenuButton icon={<MdOutlineFolderCopy/>} label={"My Job"} route={'/my-job'} activeIcon={<MdFolderCopy />} />


                {/* Applications Dropdown */}

                <button
                    onClick={() => setOpenApplications(!openApplications)}
                    className="flex items-center justify-between w-full p-2 rounded"
                >
                    <span className="text-lg text-black">Applications</span>

                    <span className={`text-xl transition-transform duration-300`}>
                        {openApplications ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
                    </span>
                </button>

                {openApplications && (
                    <div className="flex flex-col ml-6 mt-2 border-l border-gray-200 pl-3 space-y-1 transition-transform duration-500">
                        <a className="text-sm text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-black transition cursor-pointer flex justify-between">
                            Received
                            < span className="text-xl"><RiFolderReceivedLine/></span>
                        </a>
                        <a className="text-sm text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-black transition cursor-pointer flex justify-between">
                            Rejected
                            < span className="text-sm"><ImCross /></span>
                        </a>
                        <a className="text-sm text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-black transition cursor-pointer flex justify-between">
                            Approved
                            < span className="text-xl"><TiTick /></span>
                        </a>
                    </div>
                )}


                <MenuButton icon={<IoSettingsOutline />} label={"Setting"} route={'/login'} activeIcon={<IoSettingsSharp/>}/>



                <MenuButton icon={<MdLogout/>} label={"Logout"} onClick={() => setOpenModel(true)} />



                <Model
                    isOpen={openModel}
                    onClose={() => setOpenModel(false)}
                    title={"Confirm Logout"}
                >
                    <h1 className="text-black text-lg font-semibold">Are you sure?</h1>
                    <h3 className="text-gray-700 text-sm">You can later Login</h3>
                    {
                        error &&
                        <p className='mt-2.5 text-red-600 font-medium text-sm'>
                            {error}
                        </p>
                    }
                    <div className="flex gap-5 justify-end">
                        <button onClick={() => setOpenModel(false)} className="border-2 border-gray-600 bg-gray-900/60 text-white text-lg font-medium p-1 px-2 rounded-3xl hover:bg-gray-400">Cancel</button>
                        <button className=" bg-red-700 text-white text-lg font-medium p-1 px-2 rounded-3xl hover:bg-red-900" onClick={handleLogout}>Logout</button>
                    </div>
                </Model>

            </div>



        </div>
    )
}

export default SideBar