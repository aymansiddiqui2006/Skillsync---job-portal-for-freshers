import React, { useState } from 'react'
import { HiEye, HiEyeOff } from "react-icons/hi";


function Input({ label, type, placeholder, onChange, value ,autoComplete }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className='mt-3'>

            <label htmlFor={label} className='text-lg flex items-start'>
                {label}
            </label>

            <div className='relative'>
                <input type={type === "password" ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    autoComplete={autoComplete}
                    className='bg-white h-10 w-full pr-10 pl-1 rounded border-2 border-gray-200 text-black font-medium'
                />
                {
                    type === "password" &&
                    <span onClick={toggleShowPassword} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black" >
                        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                    </span>
                }
            </div>

        </div>
    )
}

export default Input