import ApiError from "../utils/ApiError.utils.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import AsyncHandler from "../utils/AsyncHandler.util.js";

//JWT is the middleware that verifies the user is autho or not
//fist: will check the cookie is there or not
//second: decode the token
//third : find the user through decoded token
//then return the user or founded user
const verifyJwt = AsyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Unauthorised user");
  }

  console.log("Cookies:", req.cookies);
  console.log("Auth Header:", req.headers.authorization);

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken._id).select(
    "-password -refreshToken",
  );
  if (!user) throw new ApiError(401, "Invalid token");

  req.user = user;
  next();
});

export default verifyJwt;
