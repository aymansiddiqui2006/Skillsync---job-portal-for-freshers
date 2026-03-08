import React, { useState } from 'react'
import { UserContext } from "../context/UserContext";
import { useContext } from 'react'

export default function SideBar() {
  const [openApplications, setOpenApplications] = useState(false)

  const {user}=useContext(UserContext)

  return (
    <aside className="flex flex-col w-72 h-screen px-6 py-8 bg-white border-r border-gray-200 shadow-sm">
      {/* User Profile */}
      <div className="flex flex-col items-center mt-6">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src={user?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt="avatar"
        />
        <h4 className="mt-4 text-lg font-semibold text-gray-800">{user?.username}</h4>
        <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col flex-1 mt-10 space-y-1">
        <a
          href="#"
          className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Jobs
        </a>

        <a
          href="#"
          className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          My Jobs
        </a>

        {/* Applications Dropdown */}
        <div>
          <button
            onClick={() => setOpenApplications(!openApplications)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Applications
            <svg
              className={`w-4 h-4 transform transition-transform ${openApplications ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openApplications && (
            <div className="flex flex-col ml-4 mt-1 space-y-1">
              <a href="#" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition">Received</a>
              <a href="#" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition">Rejected</a>
              <a href="#" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition">Approved</a>
            </div>
          )}
        </div>

        <a
          href="#"
          className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Settings
        </a>
      </nav>
    </aside>
  )
}