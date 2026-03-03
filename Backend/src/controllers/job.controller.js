import ApiError from "../utils/ApiError.utils.js";
import AsyncHandler from "../utils/AssyncHandler.utils.js";
import ApiRes from "../utils/ApiResponse.utils.js";
import {
  uploadOnCloudinary,
  deleteOnCloudinary,
} from "../utils/cloudinary.utils.js";
import { Job } from "../Model/job.model.js";

const uploadJob = AsyncHandler(async (req, res) => {
  console.log("req.files:", req.files);
  console.log("req.body:", req.body);
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
    .json(new ApiRes(200, JobUploadData, "Job Uplloaded !!"));
});

export { uploadJob };
