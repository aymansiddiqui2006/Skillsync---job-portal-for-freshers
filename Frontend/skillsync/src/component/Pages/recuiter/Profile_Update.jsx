import React from 'react'
import toast from 'react-hot-toast'
import { useState, useContext, useEffect } from 'react';

import UserContext from '../../context/UserContext.jsx'
import api from '../../../utils/apiInstance.js'
import { APIpaths } from '../../../utils/apiPath.js'

import Input from '../../elements/Inputs/Input.jsx'

// ... imports remain the same

function Profile_Update({ onClose }) {
    const { user, setUser } = useContext(UserContext);

    // 1. Initialize states
    const [fullname, setFullname] = useState(user?.fullname || '');
    const [email, setEmail] = useState(user?.email || '');
    const [username, setUsername] = useState(user?.username || '');
    const [skills, setSkills] = useState(user?.skills || '');
    const [recruiterRole, setRecuiterRole] = useState(user?.recruiterRole || '');
    const [location, setLocation] = useState(user?.location || '');
    const [contact, setContact] = useState(user?.contact || '');
    const [companyName, setCompanyName] = useState(user?.companyName || '');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

    useEffect(() => {
        if (user) {
            setFullname(user.fullname || '');
            setEmail(user.email || '');
            setUsername(user.username || '');
            const formattedSkills = Array.isArray(user.skills)
                ? user.skills.join(', ')
                : (user.skills || '');

            setSkills(formattedSkills);
            setRecuiterRole(user.recruiterRole || '');
            setLocation(user.location || '');
            setContact(user.contact || '');
            setCompanyName(user.companyName || '');
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("Submit triggered!"); // Debug log
        setError("");

        // 2. Validation with Toast feedback
        if (!email || !email.includes('@')) {
            const msg = "Please enter a valid email address";
            setError(msg);
            toast.error(msg);
            return;
        }

        const data = { fullname, email, username, skills, recruiterRole, location, contact, companyName };

        try {
            setLoading(true);
            const res = await api.patch(APIpaths.CHANGE.CHANGE_DATA, data, {
                withCredentials: true
            });

            setUser(res.data.data);
            toast.success("Profile Updated Successfully!");
            if (onClose) onClose();
        } catch (err) {
            console.error(err);
            const apiError = err?.response?.data?.message || "Server Error";
            setError(apiError);
            toast.error(apiError);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleUpdate}>
            {/* Wrap onChange to be explicit */}
            <Input label="Fullname" type="text" value={fullname} onChange={(val) => setFullname(val)} />
            <Input label="Username" type="text" value={username} onChange={(val) => setUsername(val)} />
            <Input label="Email" type="email" value={email} onChange={(val) => setEmail(val)} />
            <Input label="Contact" type="number" value={contact} onChange={(val) => setContact(val)} />

            {/* Note: changed 'type' to 'text' for location */}
            <Input label="Location" type="text" value={location} onChange={(val) => setLocation(val)} />
            <Input label="Company" type="text" value={companyName} onChange={(val) => setCompanyName(val)} />
            <Input label="Skills" type="text" value={skills} onChange={(val) => setSkills(val)} />
            <Input label="Recruiter role" type="text" value={recruiterRole} onChange={(val) => setRecuiterRole(val)} />

            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            <div className='flex justify-end mt-5 gap-4'>
                <button type="button" className='text-blue-800 text-lg font-medium' onClick={onClose}>
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
    )
}

export default Profile_Update