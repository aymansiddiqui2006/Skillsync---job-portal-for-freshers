import ApiError from "../utils/ApiError.utils.js";
import AsyncHandler from "../utils/AsyncHandler.util.js";
import ApiRes from "../utils/ApiResponse.utils.js";
import { uploadOnCloudinary } from "../utils/cloudnary.util.js";
import { User } from "../models/user.model.js";

const generatToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Token not generated but the Server");
  }
};

const UserRegister = AsyncHandler(async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  if (!fullname || !username || !email || !password || !role) {
    throw new ApiError(400, "all fields are required");
  }

  const ExistedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (ExistedUser) {
    throw new ApiError(409, "User already Existed");
  }
  const AvatarFilePath = req.files?.avatar?.[0]?.path;
  let UploadAvatar;
  
  if (AvatarFilePath) {
    UploadAvatar = await uploadOnCloudinary(AvatarFilePath);
  }

  const user = await User.create({
    fullname,
    username,
    email,
    password,
    role,
    avatar: UploadAvatar?.url,
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

  return res
    .status(201)
    .json(new ApiRes(200, responseData, "User Registered Successfully"));
});

const UserLogin = AsyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    throw new ApiError(409, "all Fields are require");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User Not Found!!");
  }

  const isMached = await user.isPasswordCorrect(password);

  if (!isMached) {
    throw new ApiError(401, "Password Not Match");
  }

  const { accessToken, refreshToken } = await generatToken(user._id);

  const LoggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiRes(
        200,
        {
          user: LoggedInUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        "User Logedin!!",
      ),
    );
});

const UserLogout = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiRes(200, {}, "User LoggedOut !!"));
});

const getUserProfile = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiRes(200, req.user, "User fetched successfully!!"));
});

export { UserRegister, UserLogin, UserLogout, getUserProfile };
