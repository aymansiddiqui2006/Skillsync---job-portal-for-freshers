import { Router } from "express";
import { UserLogin, UserLogout, UserRegister,getUserProfile } from "../controller/UserRegister.controller.js";
import verifyJwt from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  UserRegister,
);

router.route("/login").post(UserLogin)

router.route("/logout").post(verifyJwt,UserLogout)

router.route("/profile").get(verifyJwt,getUserProfile)

export default router;
