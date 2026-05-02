import React, { useState } from 'react'

import Input from '../../elements/Inputs/Input.jsx'
import Avatar from '../../elements/Inputs/Avatar.jsx'

import { NavLink, useNavigate } from 'react-router-dom'
import api from '../../../utils/apiInstance.js'
import { APIpaths } from '../../../utils/apiPath.js'

function Signin() {
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setError("")

    if (!email.trim() || !password.trim() || !username.trim() || !fullname.trim()) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return setError("Invalid email format");
    }

    if (!role) {
      setError("Please select a role");
      return;
    }

    const formData = new FormData()
    formData.append("email", email.trim());
    formData.append("fullname", fullname.trim());
    formData.append("username", username.trim());
    formData.append("password", password.trim());
    formData.append("role", role);

    if (avatar) {
      formData.append("avatar", avatar)
    }

    setLoading(true)
    try {


      await api.post(APIpaths.AUTH.SIGNIN,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      setEmail('')
      setFullname('')
      setUsername('')
      setPassword('')
      setRole('')
      setAvatar(null)

      navigate('/login')

    } catch (error) {
      setError(error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong")
    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?fm=jpg&q=60&w=3000')] bg-cover bg-center">

      <form
        onSubmit={HandleSubmit}
        noValidate
        className="flex flex-col gap-4 bg-[rgba(5,0,43,0.85)] p-10 rounded-lg shadow-2xl text-white w-[420px]"
      >

        <h1 className="text-3xl font-bold text-center mb-3">Register</h1>

        {/* Avatar */}
        <Avatar image={avatar} setImage={setAvatar} />

        {/* Inputs */}

        <Input label={"Fullname"} type={"text"} placeholder={"enter Fullname"} value={fullname} onChange={setFullname} autoComplete="name" />

        <Input label={"Username"} type={"username"} placeholder={"enter Username"} value={username} onChange={setUsername} autoComplete="username" />

        <Input label={"Email"} type={"email"} placeholder={"enter registered email"} value={email} onChange={setEmail} autoComplete="email" />

        <Input label={"Password"} type={"password"} placeholder={"enter password"} value={password} onChange={setPassword} autoComplete="new-password" />

        {/* Role */}
        <select
          value={role}
          required
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 rounded text-black outline-none bg-white"
        >
          <option value="">Select Role</option>
          <option value='fresher'>Fresher</option>
          <option value='recruiter'>Recruiter</option>
        </select>

        {/* Button */}
        <button
          disabled={loading}
          className={loading ? "loading-btn" : "btn"}
        >
          {loading ? "Registering..." : "Submit"}
        </button>

        {/* Login */}
        <div className='text-center'>
          <p>
            Already have account?{" "}
            <NavLink
              to='/login'
              className="text-blue-400 hover:underline"
            >
              Login
            </NavLink>
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm text-center font-medium">
            {error}
          </p>
        )}

      </form>
    </div>
  )
}

export default Signin