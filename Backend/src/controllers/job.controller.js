import ApiError from "../utils/ApiError.utils.js";
import AsyncHandler from "../utils/AssyncHandler.utils.js";
import ApiRes from "../utils/ApiResponse.utils.js";
import {
  uploadOnCloudinary,
  deleteOnCloudinary,
} from "../utils/cloudinary.utils.js";
import { Job } from "../Model/job.model.js";
import { User } from "../Model/user.model.js";

const uploadJob = AsyncHandler(async (req, res) => {
  const Userrole = req.user?.role;

  if (Userrole !== "recruiter") {
    throw new ApiError(403, "Only recruiters can post jobs");
  }
  const {
    companyName,
    title,
    description,
    jobType,
    workMode,
    experienceLevel,
  } = req.body;

  let { requirement } = req.body;

  if (
    !companyName ||
    !title ||
    !description ||
    !jobType ||
    !workMode ||
    !experienceLevel
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!requirement) {
    throw new ApiError(400, "Requirement is required");
  }

  // If single string, convert to array
  if (!Array.isArray(requirement)) {
    requirement = [requirement];
  }

  requirement = requirement
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  if (requirement.length === 0) {
    throw new ApiError(400, "At least one valid requirement is needed");
  }

  const logoPath = req.files?.logo?.[0]?.path;

  if (!logoPath) {
    throw new ApiError(400, "Logo not found !!");
  }

  const uploadLogo = await uploadOnCloudinary(logoPath);

  if (!uploadLogo) {
    throw new ApiError(400, "error while uploading the logo");
  }

  const DataFilePath = req.files?.DataFile?.[0]?.path;
  let uploadDataFile;
  if (DataFilePath) {
    uploadDataFile = await uploadOnCloudinary(DataFilePath);
  }

  const JobUploadData = await Job.create({
    createdBy: req.user?._id,
    companyName,
    title,
    description,
    requirement,
    jobType,
    workMode,
    experienceLevel,
    logo: uploadLogo?.url,
    DataFile: uploadDataFile?.url,
  });

  return res
    .status(201)
    .json(new ApiRes(201, JobUploadData, "Job Uplloaded !!"));
});

const updateJob = AsyncHandler(async (req, res) => {
  const userRole = req.user?.role;

  if (userRole !== "recruiter") {
    throw new ApiError(403, "Only recruiters can update jobs");
  }

  const existingJob = await Job.findOne({
    _id: req.params.jobId,
    createdBy: req.user?._id,
  });

  if (!existingJob) {
    throw new ApiError(403, "Job not found or not authorized");
  }

  const updateFields = {};
  const {
    companyName,
    title,
    description,
    jobType,
    workMode,
    experienceLevel,
  } = req.body;

  if (companyName) updateFields.companyName = companyName;
  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (jobType) updateFields.jobType = jobType;
  if (workMode) updateFields.workMode = workMode;
  if (experienceLevel) updateFields.experienceLevel = experienceLevel;

  let { requirement } = req.body;
  if (requirement) {
    if (!Array.isArray(requirement)) {
      requirement = [requirement];
    }

    requirement = requirement.map((item) => item.trim()).filter(Boolean);

    if (requirement.length === 0) {
      throw new ApiError(400, "At least one valid requirement is needed");
    }

    updateFields.requirement = requirement;
  }

  const logoPath = req.files?.logo?.[0]?.path;

  const DataFilePath = req.files?.DataFile?.[0]?.path;

  if (logoPath) {
    const logoUploadPath = await uploadOnCloudinary(logoPath);

    if (!logoUploadPath) {
      throw new ApiError(400, "Logo not uploaded");
    }

    if (existingJob.logo) {
      await deleteOnCloudinary(existingJob.logo);
    }

    updateFields.logo = logoUploadPath.url;
  }

  if (DataFilePath) {
    const DataFileUploadPath = await uploadOnCloudinary(DataFilePath);

    if (!DataFileUploadPath) {
      throw new ApiError(400, "File not uploaded");
    }

    if (existingJob.DataFile) {
      await deleteOnCloudinary(existingJob.DataFile);
    }

    updateFields.DataFile = DataFileUploadPath.url;
  }

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "No data provided to update");
  }

  const updateData = await Job.findOneAndUpdate(
    {
      _id: req.params.jobId,
      createdBy: req.user?._id,
    },
    { $set: updateFields },
    { new: true, runValidators: true },
  );

  if (!updateData) {
    throw new ApiError(403, "Job not found or not authorized");
  }

  return res.status(200).json(new ApiRes(200, updateData, "Job updated !!"));
});

const deleteJob = AsyncHandler(async (req, res) => {
  const userRole = req.user?.role;

  if (userRole !== "recruiter") {
    throw new ApiError(403, "Only recruiters can delete jobs");
  }

  const { jobId } = req.params;

  const deletedJob = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: req.user._id,
  });

  if (!deletedJob) {
    throw new ApiError(404, "Job not found");
  }

  return res.status(200).json(new ApiRes(200, deletedJob, "job deleted successfully"));
});

export { uploadJob, updateJob , deleteJob };
