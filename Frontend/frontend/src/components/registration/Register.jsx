import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { NavLink } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate();
  const [fullname, setfullname] = useState('')
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [role, setrole] = useState('')
  const [error, seterror] = useState('')
  const [avatar, setavatar] = useState(null);
  const [loading, setloading] = useState(false)

  const preview = avatar ? URL.createObjectURL(avatar) : null;

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("email", email);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      seterror('')
      const response = await axios.post('/api/v1/user/register',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(response.data)

      alert("User Registered Successfully")
      setfullname('')
      setusername('')
      setemail('')
      setpassword('')
      setrole('')
      setavatar(null)
      setloading(false)

      navigate('/login')
    }
    catch (error) {
      setloading(false)
      seterror(error?.response?.data?.message || "Something went wrong")
      console.log('error ', error)
    }
  }

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?fm=jpg&q=60&w=3000')] bg-cover bg-center">

        <form
          onSubmit={HandleSubmit}
          className="flex flex-col gap-4 bg-[rgba(5,0,43,0.85)] p-10 rounded-lg shadow-2xl text-white w-[420px]"
        >

          <h1 className="text-3xl font-bold text-center mb-4">Register</h1>


          <div className="flex flex-col gap-1">

            <label className="text-sm text-gray-200">
              Avatar <span className="text-gray-400">(optional)</span>
            </label>

            {avatar && (
              <div className="flex flex-col items-center gap-2">
                <img
                  src={preview}
                  alt="preview"
                  className="w-20 h-20 rounded-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => setavatar(null)}
                  className="text-xs text-red-400"
                >
                  Remove avatar
                </button>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setavatar(file)
                }
              }}
              className="w-full p-2 rounded text-black bg-white"
            />
          </div>

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
            required
            onChange={(e) => { setrole(e.target.value) }}
            className="w-full p-3 rounded text-black outline-none bg-white"
          >
            <option value="">Select Role</option>
            <option value='fresher'>Fresher</option>
            <option value='recruiter'>Recruiter</option>
          </select>

          <button
            disabled={loading}
            className={`w-full p-3 rounded font-bold transition
  ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-95"
              }`}
          >
            {loading ? "Registering..." : "Submit"}
          </button>

          <div className='text-center'>
            <p>Already have account?{" "}
              <NavLink to='/login'
                className="text-blue-400 hover:underline">
                Login
              </NavLink>
            </p>

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