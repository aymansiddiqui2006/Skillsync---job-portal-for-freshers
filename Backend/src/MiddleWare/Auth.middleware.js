import ApiError from "../utils/ApiError.utils.js";
import jwt from "jsonwebtoken";
import { User } from "../Model/user.model.js";
import AsyncHandler from "../utils/AssyncHandler.utils.js";

const verifyJwt = AsyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Unauthorised user");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken._id).select(
    "-password -refreshToken",
  );
  if (!user) throw new ApiError(401, "Invalid token");

  req.user = user;
  next();
});

export default verifyJwt;
