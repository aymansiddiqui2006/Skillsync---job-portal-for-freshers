import AsyncHandler from "../utils/AssyncHandler.utils.js";
import ApiRes from "../utils/ApiResponse.utils.js";
import ApiError from "../utils/ApiError.utils.js";
import {uploadOnCloudinary} from '../utils/cloudinary.utils.js'
import { User } from "../Model/user.model.js";

const UserRegister = AsyncHandler(async (req, res) => {
  const {fullname, username, email, password, role}= req.body;

  if (!fullname || !username || !email || !password || !role) {
    throw new ApiError(400, "all fields are required");
  }

  const ExistedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (ExistedUser) {
    throw new ApiError(409, "User already Existed");
  }
  console.log("req.files:", req.files)
  const AvatarFilePath=req.files?.avatar?.[0]?.path ;
  console.log("Avatar file path:", AvatarFilePath);

  const UploadAvatar=await uploadOnCloudinary(AvatarFilePath)

  const user = await User.create({
    fullname,
    username,
    email,
    password,
    role,
    avatar: UploadAvatar?.url || " "
  });

  const UserCreated = await User.findById(user._id).select("-password");

  if (!UserCreated) {
    throw new ApiError(500, "something went wrong in server");
  }

  const responseData = {
    user: UserCreated,
    upload: {
      localPath: AvatarFilePath || null,
      cloudResponse: UploadAvatar || null,
    },
  };

  res.status(200).json(new ApiRes(200, responseData, "User Registered Successfully"));
});



export { UserRegister };
