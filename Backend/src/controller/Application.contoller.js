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
    throw new ApiError(401, "not valid user to aply for job");
  }

  const {
    expectedSalary,
    availability,
    coverLetter,
    Education,
    GraduationYear,
    links,
  } = req.body;

  const resumeFile = req?.files?.resume?.[0]?.path;

  if (!expectedSalary || !availability || !coverLetter || !resumeFile) {
    throw new ApiError(401, "All fields are required");
  }

  const alreadyApplied = await Application.findOne({
    job: jobId,
    fresher: fresherId,
  });

  if (alreadyApplied) {
    throw new ApiError(401, "already applied for job");
  }

  const resumeFileurl = await uploadOnCloudinary(resumeFile);

  if (!resumeFileurl) {
    throw new ApiError(500, "something went wrong while uploading file");
  }

  const matchedSkill = user.skills.filter((skill) =>
    job.requirement.includes(skill),
  );

  const unmatchedSkill = job.requirement.filter(
    (skill) => !user.skills.includes(skill),
  );

  const matchScore = (matchedSkill.length / job.requirement.length) * 100;

  const data = await Application.create({
    job: jobId,
    fresher: fresherId,
    expectedSalary,
    availability,
    coverLetter,
    resume: resumeFileurl,

    matchScore,
    matchedSkill,
    unmatchedSkill,
  });

  return res.status(200).json(new ApiRes(200, data, "job apllied"));
});
