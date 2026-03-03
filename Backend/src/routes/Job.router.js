import { Router } from "express";
import verifyJwt from "../MiddleWare/Auth.middleware.js";
import { upload } from "../MiddleWare/multer.middleware.js";
import { uploadJob, updateJob, deleteJob } from "../controllers/job.controller.js";

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

router.route("/update/:jobId").patch(
  verifyJwt,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "DataFile", maxCount: 1 },
  ]),
  updateJob,
);

router.route("/delete/:jobId").delete(verifyJwt,deleteJob)

export default router;
