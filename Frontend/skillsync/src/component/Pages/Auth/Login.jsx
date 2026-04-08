import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';



import { useContext } from 'react';
import UserContext from '../../context/UserContext.jsx'

import Input from '../../elements/Inputs/Input.jsx';
import api from '../../../utils/apiInstance.js';
import { APIpaths } from '../../../utils/apiPath.js';


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    

    setLoading(true);

    const data = {
      email: email.trim(),
      password: password.trim()
    }



    try {
      setLoading(true);
      setError("");
      const res = await api.post(APIpaths.AUTH.LOGIN, data, {
        withCredentials: true
      })


      setEmail('')
      setPassword('')

      const user = res?.data?.data?.user;
      if (!user) throw new Error("Invalid response");
      localStorage.setItem("user", JSON.stringify(user));


      setUser(user)

      if (user.role === "recruiter") {
        navigate('/recruiter')
      }
      else {
        navigate('/')
      }

    } catch (error) {
      console.log("ERROR:", error);
      setError(error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong")

    } finally {
      setLoading(false)
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

          <form onSubmit={handleLogin} >

            <Input label={"Email"} type={"email"} placeholder={"enter registered email"} value={email} onChange={setEmail} autoComplete="email" />

            <Input label={"Password"} type={"password"} placeholder={"enter password"} value={password} onChange={setPassword} autoComplete="current-password" />

            {
              error &&
              <p className='mt-2.5 text-red-600 font-medium text-sm'>
                {error}
              </p>

            }

            <button
              type="submit"
              disabled={loading}
              className={loading ? "loading-btn" : "btn"}>
              {
                loading ? "Loading..." : "Login"
              }
            </button>

            <div className='text-center'>
              <p>Don't have account?{" "}
                <NavLink to='/signin'
                  className="text-blue-400 hover:underline">
                  Register
                </NavLink>
              </p>

            </div>

          </form>



        </div>
      </div>
    </div>
  )
}

export default Login