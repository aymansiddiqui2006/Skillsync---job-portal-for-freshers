import React, { useState } from 'react'
import axios from 'axios'

export default function Register() {
  const [fullname, setfullname] = useState('')
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [role, setrole] = useState('')
  const [error, seterror] = useState('')

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullname,
      username,
      password,
      email,
      role,
    };
    try {
      seterror('')
      const response = await axios.post('/api/v1/user/register', data);
      console.log(response.data)

      alert("User Registered Successfully")
    } catch (error) {
      if (error.response && error.response.data.message) {
        seterror(error.response.data)

      }
      console.log('error ', error)
    }

  }

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?fm=jpg&q=60&w=3000')] bg-cover bg-center">

        <form
          action="submit"
          onSubmit={HandleSubmit}
          className="flex flex-col gap-4 bg-[rgba(5,0,43,0.85)] p-10 rounded-lg shadow-2xl text-white w-[420px]"
        >

          <h1 className="text-3xl font-bold text-center mb-4">Register</h1>

          <input
            type="text"
            placeholder="Enter Fullname"
            required
            value={fullname}
            onChange={(e) => { setfullname(e.target.value) }}
            className="w-full p-3 rounded text-black outline-none bg-white"
          />

          <input
            type="text"
            placeholder="Enter Username"
            required
            value={username}
            onChange={(e) => { setusername(e.target.value) }}
            className="w-full p-3 rounded text-black outline-none bg-white"
          />

          <input
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => { setemail(e.target.value) }}
            className="w-full p-3 rounded text-black outline-none bg-white"
          />

          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => { setpassword(e.target.value) }}
            className="w-full p-3 rounded text-black outline-none bg-white"
          />

          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => { setrole(e.target.value) }}
            className="w-full p-3 rounded text-black outline-none bg-white"
          >
            <option value="">Select Role</option>
            <option value='fresher'>Fresher</option>
            <option value='recruiter'>Recruiter</option>
          </select>

          <button className="w-full p-3 rounded bg-yellow-400 text-black font-bold transition hover:bg-yellow-500 hover:scale-95">
            Submit
          </button>

          <div className='text-center'>
            <p>Already have account?<a href='/' className='text-blue-400'> login</a></p>

          </div>
          {error && (
            <p className="text-red-400 text-sm text-center font-medium">
              {error}
            </p>
          )}

        </form>

      </div>
    </>
  )
}