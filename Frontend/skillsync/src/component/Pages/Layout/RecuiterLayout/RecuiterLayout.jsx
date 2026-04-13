import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Navbar.jsx'
import SideBar from '../SideBar.jsx'

function RecuiterLayout() {
    return (
        <div>
            <Navbar />
            <div className='flex'>
                <SideBar />
                <Outlet />
            </div>
        </div>
    )
}

export default RecuiterLayout