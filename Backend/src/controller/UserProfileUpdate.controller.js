import ApiError from "../utils/ApiError.utils.js";
import AsyncHandler from "../utils/AsyncHandler.util.js";
import ApiRes from "../utils/ApiResponse.utils.js";
import { uploadOnCloudinary , deleteOnCloudinary} from "../utils/cloudnary.util.js";
import { User } from "../models/user.model.js";

const ChangePassword = AsyncHandler(async (req, res) => {
  const { CurrentPassword, NewPassword } = req.body;

  if (!CurrentPassword || !NewPassword) {
    throw new ApiError(400, "ldPassword and newPassword are required");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  const PasswordMatch = await user.isPasswordCorrect(CurrentPassword);

  if (!PasswordMatch) {
    throw new ApiError(401, "Current Password Not Matched");
  }

  user.password = NewPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiRes(200, {}, "Password Changed Succesfully"));
});

const DataUpadate = AsyncHandler(async (req, res) => {
  const { fullname, email, username, skills,recruiterRole,location,contact,companyName } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname: fullname,
        email: email,
        username: username,
        recruiterRole:recruiterRole,
        location:location,
        contact:contact,
        companyName:companyName,
      },
      $push: { skills: skills },
    },
    {
      new: true,
    },
  ).select("-password -refreshToken");

  return res.status(200).json(new ApiRes(200, updatedUser, "data updated !!"));
});

const AvatarUpdate = AsyncHandler(async (req, res) => {
  const avatarFilePath = req.file?.path;

  if (!avatarFilePath) {
    throw new ApiError(400, "Avatar Not found");
  }

  const user = await User.findById(req.user._id);
  if (user.avatar) {
    const publicId = user.avatar.split("/").pop().split(".")[0];
    await deleteOnCloudinary(publicId);
  }

  const UploadAvatar = await uploadOnCloudinary(avatarFilePath);

  if (!UploadAvatar.url) {
    throw new ApiError(400, "error while uploading the file");
  }

  const userUpadateAvatar = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: UploadAvatar.url,
      },
    },
    {
      new: true,
    },
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiRes(200, userUpadateAvatar, "user avatar upadated"));
});

const ResumeUpload = AsyncHandler(async (req, res) => {
  const resumeFilePath = req.file?.path;

  if (!resumeFilePath) {
    throw new ApiError(400, "Avatar Not found");
  }

  const user = await User.findById(req.user._id);
  if (user.resume) {
    const publicId = user.resume.split("/").pop().split(".")[0];
    await deleteOnCloudinary(publicId);
  }

  const Uploadresume = await uploadOnCloudinary(resumeFilePath);

  if (!Uploadresume.url) {
    throw new ApiError(400, "error while uploading the file");
  }

  const userUpadateresume = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        resume: Uploadresume.url,
      },
    },
    {
      new: true,
    },
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiRes(200, userUpadateresume, "user Resume upadated"));
});
export { ChangePassword, DataUpadate, AvatarUpdate, ResumeUpload };
