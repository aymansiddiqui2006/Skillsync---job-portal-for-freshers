import React, { useEffect, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import UserContext from '../../context/UserContext';

import api from '../../../utils/apiInstance'
import { APIpaths } from '../../../utils/apiPath';

import Model from '../../Model.jsx'
import Input from '../../elements/Inputs/Input.jsx'

import { FaRegEdit } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

function MyJobs() {
    const { user, jobs, setJobs } = useContext(UserContext)

    const [companyName, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [jobType, setJobType] = useState('');
    const [workMode, setWorkMode] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [requirement, setRequirement] = useState("");
    const [logoFile, setLogoFile] = useState(null);


    const [uploadModel, setUploadModel] = useState(false);
    const [editJobModel, setEditJobModel] = useState(false);
    const [selectJob, setSelectJob] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get(APIpaths.JOB.GET_JOB_BY_RECRUITER(user._id), {
                    withCredentials: true
                })
                setJobs(res.data.data)

            } catch (error) {
                console.log(error);
            }
        }
        if (user?._id) fetchJobs();
    }, [user?._id, setJobs])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (!companyName || !title || !description || !jobType || !workMode || !experienceLevel) {
                return setError("All fields are required");
            }

            if (!requirement.trim()) {
                return setError("Requirement is required");
            }

            if (!logoFile) {
                return setError("Logo is required");
            }

            const formData = new FormData();

            formData.append("companyName", companyName);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("jobType", jobType);
            formData.append("workMode", workMode);
            formData.append("experienceLevel", experienceLevel);

            // FIXED REQUIREMENT
            const reqArray = requirement.split(",").map(r => r.trim()).filter(Boolean);

            reqArray.forEach(r => formData.append("requirement", r));

            formData.append("logo", logoFile);

            // DEBUG
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const res = await api.post(APIpaths.JOB.POST_JOB, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("API response:", res.data);
            toast.success("Job posted");

            setJobs(prev => [res.data.data, ...(prev || [])]);

            // reset
            setCompanyName("");
            setTitle("");
            setDescription("");
            setJobType("");
            setWorkMode("");
            setExperienceLevel("");
            setRequirement("");
            setLogoFile(null);

            setUploadModel(false);

        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message || "Job not uploaded");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setError('')
        setLoading(true)

        try {
            const formData = new FormData();

            formData.append("companyName", companyName);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("jobType", jobType);
            formData.append("workMode", workMode);
            formData.append("experienceLevel", experienceLevel);
            formData.append("requirement", requirement);
            formData.append("logo", logoFile);


            const res = await api.patch(APIpaths.JOB.UPDATE_JOB(selectJob._id), formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            setJobs(prev => prev.map(j => j._id === selectJob._id ? res.data.data : j));
            toast.success('job updated !')

            setCompanyName("");
            setTitle("");
            setDescription("");
            setJobType("");
            setWorkMode("");
            setExperienceLevel("");
            setRequirement("");
            setLogoFile(null);

            setEditJobModel(false);
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message || "Job not uploaded");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col w-full p-6 px-3'>
            <div className='flex  justify-end'>
                <button className="bg-blue-900 text-white px-5 py-2 rounded-lg font-semibold active:bg-blue-950" onClick={() => setUploadModel(true)}>Post</button>
            </div>

            <div className='grid grid-cols-5 gap-7 px-6 mt-10'>
                {
                    !jobs || jobs.length === 0 ? (
                        <div>No job posted yet !</div>
                    ) : (
                        jobs.map((job) => (
                            <div key={job._id} className='border-2  rounded-lg shadow-md shadow-gray-100 border-gray-300 hover:scale-110 duration-500 ease-in-out delay-75 h-64 w-52 overflow-hidden'>
                                <div className='w-full h-1/2 bg-gray-50 flex items-center justify-center relative' >
                                    <img src={job.logo} alt={job.companyName}
                                        className='w-full h-full object-cover ' />
                                    <div className='hover:bg-gray-400/60 p-1 rounded absolute top-2 right-2 cursor-pointer' onClick={() => {
                                        setEditJobModel(true)
                                        setSelectJob(job)
                                        setCompanyName(job.companyName);
                                        setTitle(job.title);
                                        setDescription(job.description);
                                        setJobType(job.jobType);
                                        setWorkMode(job.workMode);
                                        setExperienceLevel(job.experienceLevel);
                                        setRequirement(job.requirement?.join(", ") || "");
                                    }}>
                                        <FaRegEdit className='font-semibold' />
                                    </div>
                                    <div className='absolute right-2 bottom-2'>
                                        <p className={`text-[10px] p-1 px-3 rounded-[10px] border text-center 
                                        ${job.isActive
                                                ? 'text-green-800 bg-green-300/85 border-green-600'
                                                : 'text-gray-700 bg-gray-300/85 border-gray-500'
                                            }
                                            `}
                                            onClick={async () => {
                                                try {
                                                    const res = await api.patch(APIpaths.JOB.DELETE_JOB(job._id), {}, {
                                                        withCredentials: true
                                                    })

                                                    setJobs(prev => prev.map(j =>
                                                         j._id === job._id ? res.data.data : j 
                                                    ));
                                                    toast.success(res.data.data.isActive ? "Job activated!" : "Job closed!");
                                                    
                                                } catch (error) {
                                                    toast.error(error?.response?.data?.message || "Failed to update job status")
                                                }
                                            }}
                                        >{job.isActive ? 'active' : 'closed'}</p>
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <h2 className='font-semibold'>{job.title}</h2>
                                    <p className='text-[12px] text-gray-500'>{job.companyName}</p>
                                    <p className='text-sm text-gray-500 line-clamp-1'>{job.description}</p>
                                </div>
                                <div className='grid grid-cols-3 gap-2 over p-2'>
                                    <p className='text-[10px] text-blue-700 font-semibold bg-blue-100 p-1 rounded-full border-blue-600 border text-center truncate'>{job.jobType}</p>
                                    <p className='text-[10px] text-orange-800 font-semibold bg-orange-200 border-orange-600 border p-1 rounded-full text-center truncate'>{job.workMode}</p>
                                    <p className='text-[10px] text-green-700font-semibold bg-green-300  border-green-800 border p-1 rounded-full text-center truncate'>{job.experienceLevel}</p>
                                </div>
                            </div>
                        ))
                    )
                }

            </div>

            <Model
                isOpen={uploadModel}
                onClose={() => setUploadModel(false)}
                title={"Post Job"}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogoFile(e.target.files[0])}
                    />
                    <Input
                        label={'Company name'}
                        type={'text'}
                        placeholder={'Google , Visa , etc....'}
                        onChange={setCompanyName}
                        value={companyName}
                    />

                    <Input
                        label={'Title'}
                        type={'text'}
                        placeholder={'Internship , fulltime ,etc...'}
                        onChange={setTitle}
                        value={title}
                    />

                    <Input
                        label={'Description'}
                        type={'textarea'}
                        placeholder={'all the job details'}
                        onChange={setDescription}
                        value={description}
                    />

                    <Input
                        label={'Requirement'}
                        type={'textarea'}
                        placeholder={'React, Node.js, MongoDB'}
                        onChange={setRequirement}
                        value={requirement}
                    />

                    <div className='mt-2'>
                        <h1 className='text-lg flex items-start'>Job type</h1>

                        <div className='flex gap-4 mt-2'>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='jobType'
                                    value='internship'
                                    checked={jobType === 'internship'}
                                    onChange={(e) => setJobType(e.target.value)}
                                />
                                Internship
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='jobType'
                                    value='full-time'
                                    checked={jobType === 'full-time'}
                                    onChange={(e) => setJobType(e.target.value)}
                                />
                                Full-time
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='jobType'
                                    value='part-time'
                                    checked={jobType === 'part-time'}
                                    onChange={(e) => setJobType(e.target.value)}
                                />
                                Part-time
                            </label>

                        </div>
                    </div>

                    <div className='mt-2'>
                        <h1 className='text-lg flex items-start'>Work mode</h1>

                        <div className='flex gap-4 mt-2'>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='workMode'
                                    value='remote'
                                    checked={workMode === 'remote'}
                                    onChange={(e) => setWorkMode(e.target.value)}
                                />
                                Remote
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='workMode'
                                    value='onsite'
                                    checked={workMode === 'onsite'}
                                    onChange={(e) => setWorkMode(e.target.value)}
                                />
                                Onsite
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='workMode'
                                    value='hybrid'
                                    checked={workMode === 'hybrid'}
                                    onChange={(e) => setWorkMode(e.target.value)}
                                />
                                Hybrid
                            </label>

                        </div>
                    </div>

                    <div className='mt-2'>
                        <h1 className='text-lg flex items-start'>Experience Level</h1>

                        <div className='flex gap-4 mt-2'>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='experienceLevel'
                                    value='fresher'
                                    checked={experienceLevel === 'fresher'}
                                    onChange={(e) => setExperienceLevel(e.target.value)}
                                />
                                Fresher
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='experienceLevel'
                                    value='entry-level'
                                    checked={experienceLevel === 'entry-level'}
                                    onChange={(e) => setExperienceLevel(e.target.value)}
                                />
                                Entry-level
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='experienceLevel'
                                    value='experienced'
                                    checked={experienceLevel === 'experienced'}
                                    onChange={(e) => setExperienceLevel(e.target.value)}
                                />
                                Experienced
                            </label>

                        </div>
                    </div>

                    <div className='flex justify-end mt-5 gap-4'>
                        <button type="button" className='text-blue-800 text-lg font-medium' onClick={() => setUploadModel(false)}>
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

                    {/* Error */}
                    {error && (
                        <p className="text-red-400 text-sm text-center font-medium">
                            {error}
                        </p>
                    )}
                </form>

            </Model>

            <Model
                isOpen={editJobModel}
                onClose={() => setEditJobModel(false)}
                title={title}
            >
                <form onSubmit={handleEdit}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogoFile(e.target.files[0])}
                    />
                    <Input
                        label={'Company name'}
                        type={'text'}
                        placeholder={'Google , Visa , etc....'}
                        onChange={setCompanyName}
                        value={companyName}
                    />

                    <Input
                        label={'Title'}
                        type={'text'}
                        placeholder={'Internship , fulltime ,etc...'}
                        onChange={setTitle}
                        value={title}
                    />

                    <Input
                        label={'Description'}
                        type={'textarea'}
                        placeholder={'all the job details'}
                        onChange={setDescription}
                        value={description}
                    />

                    <Input
                        label={'Requirement'}
                        type={'textarea'}
                        placeholder={'React, Node.js, MongoDB'}
                        onChange={setRequirement}
                        value={requirement}
                    />

                    <div className='mt-2'>
                        <h1 className='text-lg flex items-start'>Job type</h1>

                        <div className='flex gap-4 mt-2'>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='jobType'
                                    value='internship'
                                    checked={jobType === 'internship'}
                                    onChange={(e) => setJobType(e.target.value)}
                                />
                                Internship
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='jobType'
                                    value='full-time'
                                    checked={jobType === 'full-time'}
                                    onChange={(e) => setJobType(e.target.value)}
                                />
                                Full-time
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='jobType'
                                    value='part-time'
                                    checked={jobType === 'part-time'}
                                    onChange={(e) => setJobType(e.target.value)}
                                />
                                Part-time
                            </label>

                        </div>
                    </div>

                    <div className='mt-2'>
                        <h1 className='text-lg flex items-start'>Work mode</h1>

                        <div className='flex gap-4 mt-2'>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='workMode'
                                    value='remote'
                                    checked={workMode === 'remote'}
                                    onChange={(e) => setWorkMode(e.target.value)}
                                />
                                Remote
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='workMode'
                                    value='onsite'
                                    checked={workMode === 'onsite'}
                                    onChange={(e) => setWorkMode(e.target.value)}
                                />
                                Onsite
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='workMode'
                                    value='hybrid'
                                    checked={workMode === 'hybrid'}
                                    onChange={(e) => setWorkMode(e.target.value)}
                                />
                                Hybrid
                            </label>

                        </div>
                    </div>

                    <div className='mt-2'>
                        <h1 className='text-lg flex items-start'>Experience Level</h1>

                        <div className='flex gap-4 mt-2'>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='experienceLevel'
                                    value='fresher'
                                    checked={experienceLevel === 'fresher'}
                                    onChange={(e) => setExperienceLevel(e.target.value)}
                                />
                                Fresher
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='experienceLevel'
                                    value='entry-level'
                                    checked={experienceLevel === 'entry-level'}
                                    onChange={(e) => setExperienceLevel(e.target.value)}
                                />
                                Entry-level
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='experienceLevel'
                                    value='experienced'
                                    checked={experienceLevel === 'experienced'}
                                    onChange={(e) => setExperienceLevel(e.target.value)}
                                />
                                Experienced
                            </label>

                        </div>
                    </div>

                    <div className='flex justify-end mt-5 gap-4'>
                        <button type="button" className='text-blue-800 text-lg font-medium' onClick={() => setEditJobModel(false)}>
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

                    {/* Error */}
                    {error && (
                        <p className="text-red-400 text-sm text-center font-medium">
                            {error}
                        </p>
                    )}
                </form>

            </Model>

        </div>
    )

}

export default MyJobs