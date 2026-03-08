import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from "../context/UserContext";


export default function Login() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)

    const {setUser}=useContext(UserContext)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }

        try {
            seterror('')
            setloading(true)
            const response = await axios.post('/api/v1/user/login', data, { withCredentials: true });
            console.log(response.data);

            alert("user login successfully !! ")
            setemail('')
            setpassword('')

            const user=response?.data?.data?.user;

            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            
            if(user.role==="recruiter"){
                navigate('/recruiter')
            }else{
                navigate('/fresher')
            }

        } catch (error) {
            seterror(error?.response?.data?.message || "something went wrong")
            console.log("error:", error)
        }
        finally {

            setloading(false)

        }
    }


    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center "
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?fm=jpg&q=60&w=3000')"
            }}
        >

            <div className="w-full max-w-md p-5 ">

                <div className="bg-[rgba(5,0,43,0.85)] p-10 rounded-xl shadow-2xl text-white text-center">

                    <h2 className="text-3xl mb-8 font-semibold">
                        Login
                    </h2>

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                        <div className="text-left">
                            <label className="block mb-1 font-bold">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => { setemail(e.target.value) }}
                                className="w-full p-3 rounded-md text-black outline-none bg-white"
                            />
                        </div>

                        <div className="text-left">
                            <label className="block mb-1 font-bold">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => { setpassword(e.target.value) }}
                                className="w-full p-3 rounded-md text-black outline-none bg-white"
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className="w-full p-3 rounded-md bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
                        >
                            {loading ? "Login..." : "Submit"}
                        </button>

                        <div className='text-center'>
                            <p>Don't have account?{" "}
                                <NavLink to='/register'
                                    className="text-blue-400 hover:underline">
                                    Register
                                </NavLink>
                            </p>

                        </div>

                        {error &&
                            (<p className="text-red-400 text-sm text-center font-medium">
                                {error}
                            </p>)
                        }

                    </form>


                </div>
            </div>
        </div>
    )
}
