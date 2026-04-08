import { HiOutlineArrowCircleDown, HiOutlineArrowCircleUp, HiFolderOpen, HiCollection, HiClipboardList, HiTemplate } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { RiFolderReceivedFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

import React, { useContext, useState } from 'react'
import MenuButton from '../../elements/sidebar/MenuButton.jsx'

import UserContext from "../../context/UserContext.jsx";




function SideBar() {
    const { user } = useContext(UserContext);

    const [openApplications, setOpenApplications] = useState(false)
    return (
        <div className="flex flex-col gap-6 w-72 h-screen px-6 py-8 bg-white shadow-lg  shadow-gray-400">

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

                <div className="hover:bg-gray-100 rounded-lg transition px-2 py-1">
                    <MenuButton icon={<HiTemplate />} label={"Jobs"} route={'/recruiter'} />
                </div>

                <div className="hover:bg-gray-100 rounded-lg transition px-2 py-1">
                    <MenuButton icon={<HiCollection />} label={"Jobs"} route={'/recruiter'} activeIcon={<HiFolderOpen />} />
                </div>

                <div className="hover:bg-gray-100 rounded-lg transition px-2 py-1">
                    <MenuButton icon={<HiClipboardList />} label={"My Job"} route={'/recruiter'} />
                </div>

                {/* Applications Dropdown */}
                <div className="hover:bg-gray-100 rounded-lg transition px-2 py-1">
                    <button
                        onClick={() => setOpenApplications(!openApplications)}
                        className="flex items-center justify-between w-full p-2 rounded"
                    >
                        <span className="text-lg text-black">Applications</span>

                        <span className={`text-xl transition-transform duration-300`}>
                            {openApplications ? <HiOutlineArrowCircleUp /> : <HiOutlineArrowCircleDown />}
                        </span>
                    </button>

                    {openApplications && (
                        <div className="flex flex-col ml-6 mt-2 border-l border-gray-200 pl-3 space-y-1">
                            <a className="text-sm text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-black transition cursor-pointer flex justify-between">
                                Received
                                < span className="text-xl"><RiFolderReceivedFill/></span>
                            </a>
                            <a className="text-sm text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-black transition cursor-pointer flex justify-between">
                                Rejected
                                < span className="text-sm"><ImCross/></span>
                            </a>
                            <a className="text-sm text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-black transition cursor-pointer flex justify-between">
                                Approved
                                < span className="text-xl"><TiTick/></span>
                            </a>
                        </div>
                    )}
                </div>

                <div className="hover:bg-gray-100 rounded-lg transition px-2 py-1">
                    <MenuButton icon={<IoMdSettings />} label={"Setting"} route={'/login'} />
                </div>

                <div className="hover:bg-red-100 rounded-lg transition px-2 py-1">
                    <MenuButton icon={<IoLogOutOutline />} label={"Logout"} route={'/recruiter'} />
                </div>

            </div>
        </div>
    )
}

export default SideBar