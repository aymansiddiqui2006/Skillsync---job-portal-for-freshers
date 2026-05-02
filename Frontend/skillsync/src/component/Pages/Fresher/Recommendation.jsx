import React, { useContext, useEffect } from 'react';
import userContext from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import api from '../../../utils/apiInstance';
import { APIpaths } from '../../../utils/apiPath';

function Recommendation() {
  const { user,recommendation, setRecommendation} = useContext(userContext);

  const navigate = useNavigate()

   useEffect(() => {

    const FetchreccomendedJob = async () => {
      try {

        const res = await api.get(
          APIpaths.JOB.GET_RECOMMENDED_JOBS
        );

        setRecommendation(res?.data?.data || []);

      } catch (error) {

        toast.error(
          error?.response?.data?.message ||
          "Failed to fetch jobs"
        );
      }
    };

    FetchreccomendedJob();

  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        All Active Jobs
      </h1>
      {!recommendation || recommendation.length === 0 ? (
        <div className="text-gray-500">No job posted yet!</div>
      ) : (
        <div className="flex flex-wrap gap-6" >
          {recommendation?.map((job) => (
            <div
              key={job._id}
              className="flex flex-col w-60 min-h-60 border-2 rounded-lg shadow-sm border-gray-300 hover:shadow-lg hover:scale-105 transition overflow-hidden"
              onClick={() => {
                if (user?.role === 'recruiter') {
                  navigate(`/recruiter/jobs/${job._id}`)
                }
                if (user?.role === 'fresher') {
                  navigate(`/user/jobs/${job._id}`)
                }
              }}
            >
              {/* Image */}
              <div className="h-32 bg-gray-50 flex items-center justify-center">
                <img
                  src={job.logo || "/fallback.png"}
                  alt={job.companyName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col flex-grow">
                <h2 className="font-semibold text-sm line-clamp-1">
                  {job.title}
                </h2>

                <p className="text-xs text-gray-500">
                  {job.companyName}
                </p>

                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {job.description}
                </p>

                {/* Name + Date */}
                <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2">
                  <span>{job.createdBy?.username}</span>
                  <span>
                    {new Date(job.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>

                {/* Tags */}
                <div className="grid grid-cols-3 gap-2 mt-auto pt-3">
                  <p className="text-[10px] text-blue-700 font-semibold bg-blue-100 px-2 py-1 rounded-full border border-blue-600 text-center truncate">
                    {job.jobType}
                  </p>

                  <p className="text-[10px] text-orange-800 font-semibold bg-orange-200 px-2 py-1 rounded-full border border-orange-600 text-center truncate">
                    {job.workMode}
                  </p>

                  <p className="text-[10px] text-green-700 font-semibold bg-green-300 px-2 py-1 rounded-full border border-green-800 text-center truncate">
                    {job.experienceLevel}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Recommendation