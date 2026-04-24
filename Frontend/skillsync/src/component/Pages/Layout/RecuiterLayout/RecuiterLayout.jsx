import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Navbar.jsx'
import SideBar from '../SideBar.jsx'

function RecuiterLayout() {
    return (
        <div className='h-screen overflow-hidden'>
            
            <div className='fixed top-0 left-0 right-0 z-20'>
                <Navbar />
            </div>

            <div className='flex mt-20'>  
                
                <div className='fixed left-0 top-20 h-[calc(100vh-80px)] z-10 '>
                    <SideBar />
                </div>

                <div className='ml-72 flex-1 h-[calc(100vh-80px)] overflow-y-auto'>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default RecuiterLayout