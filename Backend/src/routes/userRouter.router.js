import { Router } from "express";
import { UserLogin, UserLogout, UserRegister } from "../controllers/UserRegistration.controller.js";
import {upload} from "../MiddleWare/multer.middleware.js"
import verifyJwt from "../MiddleWare/Auth.middleWare.js";

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

export default router;
