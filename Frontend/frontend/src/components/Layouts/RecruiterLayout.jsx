import React from 'react'
import { Outlet } from 'react-router-dom'
import ReccuiterNavBar from '../recuiter/ReccuiterNavBar'
import ReccuiterFooter from '../recuiter/ReccuiterFooter'
import SideBar from '../recuiter/SideBar'


export default function RecruiterLayout() {
    return (
        <>
            <ReccuiterNavBar />

            <div className='flex w-screen'>
                <SideBar />
                <Outlet />
            </div>

            <ReccuiterFooter />
        </>
    )
}
