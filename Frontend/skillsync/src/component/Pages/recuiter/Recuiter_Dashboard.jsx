import React, {  useContext, useEffect } from 'react'

import InfoContainer from '../../elements/Page elements/InfoContainer.jsx'

import UserContext from '../../context/UserContext.jsx'
import api from '../../../utils/apiInstance.js'
import { APIpaths } from '../../../utils/apiPath.js'
import toast from 'react-hot-toast'
import JobContainer from '../../elements/Page elements/JobContainer.jsx'



function Recuiter_Dashboard() {
  const { user, jobs, setJobs, AllJobs, setAllJobs } = useContext(UserContext)


  useEffect(() => {
    const fetchAllJobs = async () => {

      try {
        const res = await api.get(APIpaths.JOB.GET_ALL_JOB,)
        setAllJobs(res?.data?.data?.jobs || []);
      }
      catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch jobs")
      }
    }

    fetchAllJobs()
  },
    [])

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(APIpaths.JOB.GET_JOB_BY_RECRUITER(user._id), {
          withCredentials: true
        })
        setJobs(res.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Jobs not fetched')
      }
    }
    if (user?._id) fetchJob();
  },
    [user._id, setJobs])

  const previewJobs = AllJobs.slice(0, 10);
  const previewMyJobs = jobs.slice(0, 10);

  return (
    <div className='px-10 py-12 flex flex-col gap-14'>
      <InfoContainer
        lable={'Jobs'}
        route={'/recruiter/job'}
        items={
          AllJobs?.length === 0 ? (
            <p>No jobs available</p>
          ) :
            (
              <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 ">
                {previewJobs.map((job) => (
                  <JobContainer
                    key={job._id}
                    title={job.title}
                    logo={job.logo}
                    description={job.description}
                    date={job.createdAt}
                    jobType={job.jobType}
                    experienceLevel={job.experienceLevel}
                    workMode={job.workMode}
                    name={job.createdBy?.username}
                    route={job._id}
                  />
                ))}
              </div>
            )
        }
      />

      <InfoContainer
        lable={'My Jobs'}
        route={'/recruiter/my-job'}
        items={
          jobs?.length === 0 ? (
            <p>No jobs available</p>
          ) :
            (
              <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2" >
                {previewMyJobs.map((job) => (
                  <JobContainer
                    key={job._id}
                    title={job.title}
                    logo={job.logo}
                    description={job.description}
                    date={job.createdAt}
                    jobType={job.jobType}
                    experienceLevel={job.experienceLevel}
                    workMode={job.workMode}
                    active={job.isActive}
                  />
                ))}
              </div>
            )
        }
      />
    </div>
  )
}

export default Recuiter_Dashboard