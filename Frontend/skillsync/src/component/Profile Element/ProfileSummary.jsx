import React, { useContext, useEffect, useState } from 'react'
import Model from '../Model';
import Input from '../elements/Inputs/Input';
import api from '../../utils/apiInstance';
import { APIpaths } from '../../utils/apiPath';
import toast from 'react-hot-toast';

import UserContext from '../context/UserContext.jsx'

function ProfileSummary() {

    const { user, setUser } = useContext(UserContext);

    const [model, setModel] = useState(false);

    const [profileSummary, setProfileSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!user) return
        if (user?.profileSummary) {
            setProfileSummary(user.profileSummary)
        }
    }, [user])

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const data = { profileSummary: profileSummary };

        try {
            const res = await api.patch(APIpaths.CHANGE.CHANGE_DATA, data, {
                withCredentials: true
            })
            const updatedUser = res.data.data;

            setUser(updatedUser);

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );
            toast.success("Profile Updated Successfully!")
            setError(false);
            setModel(false);
        } catch (error) {
            setError(error?.response?.data?.message || "Server Error")

        } finally {
            setLoading(false);
        }

    }

    return (
        <div className='bg-white shadow-gray-300 shadow-xl rounded-xl py-3 px-12'>
            <div className='flex justify-between'>
                <h1 className='font-medium text-xl items-start'>Profile summary</h1>
                <p className='cursor-pointer font-semibold text-blue-700 text-xl' onClick={() => setModel(true)} >Add profile summary</p>
            </div>
            <h1 className='text-gray-500 text-sm font-semibold mt-3'>Highlight your key career achievements to help employers know your potential</h1>

            {
                profileSummary && (
                    <div className='bg-gray-200/45 rounded-sm p-3.5 mt-5 border-gray-200'>
                        {profileSummary}
                    </div>
                )
            }


            <Model
                isOpen={model}
                onClose={() => setModel(false)}
                title={"Profile summary"}
            >
                <form onSubmit={HandleSubmit}>
                    <Input
                        comment={"Give recruiters a brief overview of the highlights of your career, key achievements, and career goals to help recruiters know your profile better."}
                        type={"textarea"}
                        placeholder={""}
                        onChange={setProfileSummary}
                        value={profileSummary}
                    />

                    <div className='flex justify-end mt-5 gap-4'>
                        <button type="button" className='text-blue-800 text-lg font-medium' onClick={() => setModel(false)}>
                            Cancel
                        </button>
                        <button
                            className={`rounded-2xl bg-blue-800 text-lg text-white px-5 py-2 ${loading ? 'opacity-50' : ''}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </Model>
        </div>
    )
}

export default ProfileSummary