import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

import UserContext from '../context/UserContext';
import api from '../../utils/apiInstance';
import { APIpaths } from '../../utils/apiPath';



function DeleteUser() {

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [error, setError] = useState('')

  const handleDelete = async () => {

    try {
      await api.delete(APIpaths.AUTH.DELETE_ACCOUNT);

      setUser(null);
      navigate('/landing-page')
    } catch (error) {
      setError(error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong")

      toast.error("account failed to Delete")
    }
  }
  return (
    <div className='bg-white shadow-gray-300 shadow-xl rounded-xl py-7 px-5 flex justify-between'>
      <div className='text-lg font-semibold'>Delete Your Account
        {
          error &&

          <p className='mt-2.5 text-red-600 font-medium text-sm'>
            {error}
          </p>

        }
      </div>
      <button className='bg-red-600 text-white text-l rounded-lg p-1.5 hover:bg-red-800 ' onClick={handleDelete}>Delete Account permanently</button>
    </div>
  )
}

export default DeleteUser