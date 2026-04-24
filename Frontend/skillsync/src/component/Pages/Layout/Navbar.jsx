import React,{useContext} from 'react'
import logo from '../../images/logo.png'
import UserContext from '../../context/UserContext'
import { NavLink } from 'react-router'
import { Bell, Search } from 'lucide-react'


function Navbar() {
    const {user}=useContext(UserContext)
    return (
        <nav className='bg-[#00296d] w-full h-20 px-10 flex items-center justify-between  top-0 z-50 font-serif '>

            {/* Logo */}
            <NavLink to='/' className='flex items-center gap-3'>
                <img src={logo} alt="logo" className="w-14" />
                <span className='text-white text-2xl font-bold'>SKILLSYNC</span>
            </NavLink>          

            {/* Search + Notification + Profile */}
            <div className='flex items-center gap-5'>

                {/* Search Bar */}
                <div className='flex items-center bg-white rounded-full px-3 py-1'>
                    <Search size={18} className='text-gray-500 mr-2' />
                    <input
                        type="text"
                        placeholder="Search..."
                        className='outline-none text-sm h-8 w-48'
                    />
                </div>

                {/* Notification */}
                <div className='bg-white p-2 rounded-full cursor-pointer'>
                    <Bell size={20} className='text-[#00296d]' />
                </div>

                {/* Profile */}
                <NavLink to='/profile'>
                    <img
                        src={user?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                        alt="profile"
                        className='h-10 w-10 rounded-full cursor-pointer border-2 border-white'
                    />
                </NavLink>


            </div>

        </nav>
    )
}

export default Navbar