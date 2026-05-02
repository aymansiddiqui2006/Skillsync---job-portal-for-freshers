import React, { useContext, useEffect, useState } from 'react'

import InfoContainer from '../../elements/Page elements/InfoContainer.jsx'

import UserContext from '../../context/UserContext.jsx'
import api from '../../../utils/apiInstance.js'
import { APIpaths } from '../../../utils/apiPath.js'
import toast from 'react-hot-toast'
import JobContainer from '../../elements/Page elements/JobContainer.jsx'



function Seeker_Dashboard() {
  const { AllJobs, setAllJobs } = useContext(UserContext)
  const [rec, setRec]  = useState([]);


  useEffect(() => {
    const fetchAllJobs = async () => {

      try {
        const res = await api.get(APIpaths.JOB.GET_ALL_JOB)
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

    const FetchreccomendedJob = async () => {
      try {
        const fetch = await api.get(APIpaths.JOB.GET_RECOMMENDED_JOBS);
        setRec(fetch?.data?.data?.jobs)
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch jobs")
      }
    }
  }, [setRec])



  const previewJobs = AllJobs.slice(0, 10);

  const previewRec = rec.slice(0,10);

  return (
    <div className='px-10 py-12 flex flex-col gap-14'>

      <InfoContainer
        lable={'Recommneded Jobs'}
        route={'/user/jobs/recommendation'}
        items={
          rec?.length === 0 ? (
            <p>No jobs available</p>
          ) :
            (
              <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 ">
                {previewRec.map((job) => (
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
        lable={'Jobs'}
        route={'/user/my-job'}
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


    </div>
  )
}

export default Seeker_Dashboard