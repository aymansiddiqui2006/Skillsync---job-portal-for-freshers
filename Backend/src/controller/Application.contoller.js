import ApiError from "../utils/ApiError.utils.js";
import ApiRes from "../utils/ApiResponse.utils.js";
import AsyncHandler from "../utils/AsyncHandler.util.js";

import {
  uploadOnCloudinary,
  deleteOnCloudinary,
} from "../utils/cloudnary.util.js";

import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

const ApplyJob = AsyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const fresherId = req.user?._id;

  const user = await User.findById(fresherId);
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (user?.role !== "fresher") {
    throw new ApiError(401, "Not authorized to apply for job");
  }

  const {
    expectedSalary,
    availability,
    coverLetter,
    education,
    graduationYear,
  } = req.body;

  const resumeFile = req?.files?.resume?.[0]?.path;

  // ✅ FIXED VALIDATION
  if (!expectedSalary || !availability || !coverLetter) {
    throw new ApiError(400, "Required fields are missing");
  }

  const alreadyApplied = await Application.findOne({
    job: jobId,
    fresher: fresherId,
  });

  if (alreadyApplied) {
    throw new ApiError(409, "Already applied for this job");
  }

  let resumeFileurl = null;

  if (resumeFile) {
    resumeFileurl = await uploadOnCloudinary(resumeFile);

    if (!resumeFileurl) {
      throw new ApiError(500, "Resume upload failed");
    }
  }

  const matchedSkill = user.skills.filter((skill) =>
    job.requirement.includes(skill),
  );

  const unmatchedSkill = job.requirement.filter(
    (skill) => !user.skills.includes(skill),
  );

  const matchScore =
    job.requirement.length > 0
      ? (matchedSkill.length / job.requirement.length) * 100
      : 0;

  const data = await Application.create({
    job: jobId,
    fresher: fresherId,
    expectedSalary,
    availability,
    coverLetter,
    education,
    graduationYear,
    resume: resumeFileurl,
    matchScore,
    matchedSkill,
    unmatchedSkill,
  });

  return res
    .status(201)
    .json(new ApiRes(201, data, "Job applied successfully"));
});

const FeedBack = AsyncHandler(async (req, res) => {
  const user = req.user;

  if (user?.role !== "recruiter") {
    throw new ApiError(401, "not valid user for feedback");
  }

  const { ApplicationId } = req.params;

  const application = await Application.findById(ApplicationId);

  if (!application) {
    throw new ApiError(401, "not valid application");
  }

  const {
    technicalSkills,
    communication,
    experienceGap,
    overallRemark,
    jobStatus,
  } = req.body;

  if (!jobStatus) {
    throw new ApiError(402, "require job status");
  }

  application.feedback = {
    technicalSkills,
    communication,
    overallRemark,
    experienceGap,
  };

  application.jobStatus = jobStatus;

  await application.save();

  return res.status(200).json(new ApiRes(200, application, "feedback saved"));
});



export { ApplyJob, FeedBack };
