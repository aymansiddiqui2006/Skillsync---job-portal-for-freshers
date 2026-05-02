import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../../../utils/apiInstance'
import { APIpaths } from '../../../utils/apiPath'

function Apply_job() {
  const { id } = useParams()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Form states
  const [coverLetter, setCoverLetter] = useState('')
  const [availability, setAvailability] = useState('')
  const [expectedSalary, setExpectedSalary] = useState('')
  const [education, setEducation] = useState('')
  const [graduationYear, setGraduationYear] = useState('')
  const [resume, setResume] = useState(null)

  const availabilityOptions = ["immediate", "15-days", "1-month"]

  // Fetch single job
  useEffect(() => {
    if (!id) return

    const fetchJob = async () => {
      try {
        const res = await api.get(APIpaths.JOB.GET_SINGLE_JOB(id))
        setJob(res.data.data)
      } catch (error) {
        toast.error(
          error?.response?.data?.message || 'Could not load job'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!coverLetter.trim() || !availability || !expectedSalary) {
      return toast.error('Please fill all required fields')
    }

    try {
      setSubmitting(true)

      // FormData for file upload
      const formData = new FormData()

      formData.append('coverLetter', coverLetter.trim())
      formData.append('availability', availability)
      formData.append('expectedSalary', Number(expectedSalary))
      formData.append('education', education.trim())
      formData.append('graduationYear', graduationYear)

      // Resume upload
      if (resume) {
        formData.append('resume', resume)
      }

      const res = await api.post(
        APIpaths.APPLICATION.APPLY_JOB(id),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      toast.success(
        res.data.message || 'Application submitted successfully!'
      )

      // Reset form
      setCoverLetter('')
      setAvailability('')
      setExpectedSalary('')
      setEducation('')
      setGraduationYear('')
      setResume(null)

    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Application failed'
      )
    } finally {
      setSubmitting(false)
    }
  }

  // Loading states
  if (loading) {
    return (
      <div className="p-6 text-lg font-medium">
        Loading...
      </div>
    )
  }

  if (!job) {
    return (
      <div className="p-6 text-lg font-medium">
        Job not found.
      </div>
    )
  }

  return (
    <div className='p-5'>
      <div className='rounded-2xl shadow-lg p-6 bg-white flex flex-col gap-6'>

        {/* Job Title */}
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>
            {job?.title}
          </h1>

          {job?.companyName && (
            <p className='text-gray-500 mt-1'>
              {job.companyName}
            </p>
          )}
        </div>

        {/* Application Form */}
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-5'
        >

          {/* Cover Letter */}
          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700 text-xl'>
              Why should we hire you?
            </label>

            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder='Write your cover letter here...'
              rows={6}
              className='w-full p-4 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700'
            />
          </div>

          {/* Availability */}
          <div className='flex flex-col gap-2'>
            <p className='font-medium text-gray-700 text-xl'>
              Availability
            </p>

            <div className='flex flex-wrap gap-3'>
              {availabilityOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition text-sm font-medium
                  ${
                    availability === option
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <input
                    type='radio'
                    value={option}
                    checked={availability === option}
                    onChange={() => setAvailability(option)}
                    className='sr-only'
                  />

                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Expected Salary */}
          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700 text-xl'>
              Expected Salary
            </label>

            <input
              type='number'
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              placeholder='Enter expected salary'
              className='w-full p-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Education */}
          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700 text-xl'>
              Education
            </label>

            <input
              type='text'
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder='e.g. B.Tech / MBA / BSc'
              className='w-full p-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Graduation Year */}
          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700 text-xl'>
              Graduation Year
            </label>

            <input
              type='number'
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              placeholder='e.g. 2025'
              className='w-full p-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Resume Upload */}
          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700 text-xl'>
              Upload Resume (PDF)
            </label>

            <input
              type='file'
              accept='.pdf'
              onChange={(e) => setResume(e.target.files[0])}
              className='w-full p-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            {resume && (
              <p className='text-sm text-green-600'>
                Selected: {resume.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={
              submitting ||
              !coverLetter ||
              !availability ||
              !expectedSalary
            }
            className='mt-3 bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {submitting ? 'Submitting...' : 'Apply Now'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Apply_job