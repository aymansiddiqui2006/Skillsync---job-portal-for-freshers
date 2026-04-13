import React from 'react'
import { useNavigate } from 'react-router-dom'

function MenuButton({ label, icon, route, activeIcon,onClick }) {
    const navigate = useNavigate();

    const isActive = location.pathname === route;

    const handleRoute = () => {
        if (onClick) {
            onClick(); 
        } else if (route) {
            navigate(route);
        }
    }

    return (
        <div
            onClick={handleRoute}
            className={`flex items-center justify-between gap-3 cursor-pointer p-2 rounded
                ${isActive ? "bg-blue-900/45" : "hover:bg-gray-200"}
            `}
        >
            <span className='text-lg text-black'>
                {label}
            </span>

            <span className="text-xl ">
                {activeIcon && isActive ? activeIcon : icon}
            </span>

        </div>
    )
}

export default MenuButton