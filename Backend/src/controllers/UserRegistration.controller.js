import AsyncHandler from "../utils/AssyncHandler.utils.js";
import ApiRes from "../utils/ApiResponse.utils.js";
import ApiError from "../utils/ApiError.utils.js";
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

  const user = await User.create({
    fullname,
    username,
    email,
    password,
    role,
  });

  const UserCreated = await User.findById(user._id).select(
   "-password"
);

  if (!UserCreated) {
    throw new ApiError(500, "something went wrong in server");
  }

   res.status(200).json(new ApiRes(200,UserCreated,"User Registered Successfully"))
});

export { UserRegister };
