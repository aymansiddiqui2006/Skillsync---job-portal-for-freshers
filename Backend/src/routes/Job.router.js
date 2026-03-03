import {Router} from "express";
import verifyJwt from "../MiddleWare/Auth.middleWare.js";
import { upload } from "../MiddleWare/multer.middleware.js";
import { uploadJob } from "../controllers/job.controller.js";

const router = Router();

router.route("/upload").post(
  verifyJwt,
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "DataFile",
      maxCount: 1,
    },
  ]),
  uploadJob,
);

export default router;
