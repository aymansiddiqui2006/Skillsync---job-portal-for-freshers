import { Router } from "express";
import { UserRegister } from "../controllers/UserRegistration.controller.js";
import {upload} from "../MiddleWare/multer.middleware.js"

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

export default router;
