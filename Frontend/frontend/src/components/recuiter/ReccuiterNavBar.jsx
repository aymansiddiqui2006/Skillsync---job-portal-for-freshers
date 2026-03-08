import React, { useContext } from 'react'
import logo from '/src/images/logo.png'
import { NavLink } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { UserContext } from '../context/UserContext'

export default function RecruiterNavBar() {
  const {user}=useContext(UserContext);
  return (
    <nav className='bg-[#00296d] w-full h-20 px-10 flex items-center justify-between  top-0 z-50 font-serif'>

      {/* Logo */}
      <NavLink to='/' className='flex items-center gap-3'>
        <img src={logo} alt="logo" className="w-14" />
        <span className='text-white text-2xl font-bold'>SKILLSYNC</span>
      </NavLink>

      {/* Navigation Links */}
      <ul className='flex items-center gap-10 text-white font-semibold text-lg'>
        <li>
          <NavLink 
            to='/jobs'
            className={({isActive}) => isActive ? 'text-amber-400' : 'hover:text-amber-300'}
          >
            Jobs
          </NavLink>
        </li>

        <li>
          <NavLink 
            to='/my-job'
            className={({isActive}) => isActive ? 'text-amber-400' : 'hover:text-amber-300'}
          >
            My Jobs
          </NavLink>
        </li>

        <li>
          <NavLink 
            to='/post-job'
            className={({isActive}) => isActive ? 'text-amber-400' : 'hover:text-amber-300'}
          >
            Post Job
          </NavLink>
        </li>
      </ul>

      {/* Search + Notification + Profile */}
      <div className='flex items-center gap-5'>

        {/* Search Bar */}
        <div className='flex items-center bg-white rounded-full px-3 py-1'>
          <Search size={18} className='text-gray-500 mr-2'/>
          <input
            type="text"
            placeholder="Search jobs..."
            className='outline-none text-sm'
          />
        </div>

        {/* Notification */}
        <div className='bg-white p-2 rounded-full cursor-pointer'>
          <Bell size={20} className='text-[#00296d]' />
        </div>

        {/* Profile */}
        <img
          src={user?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt="profile"
          className='h-10 w-10 rounded-full cursor-pointer border-2 border-white'
        />

      </div>

    </nav>
  )
}