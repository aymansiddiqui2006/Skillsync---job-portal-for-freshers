import { Router } from "express";
import verifyJwt from "../MiddleWare/Auth.middleware.js";
import { upload } from "../MiddleWare/multer.middleware.js";
import { uploadJob, updateJob, deleteJob,getAllJob,getJob,getJobByRecuiter } from "../controllers/job.controller.js";

const router = Router();

router.route("/").post(
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

router.route("/:jobId").patch(
  verifyJwt,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "DataFile", maxCount: 1 },
  ]),
  updateJob,
);

router.route("/:jobId").delete(verifyJwt,deleteJob)

router.route("/").get(verifyJwt,getAllJob)

router.route("/:jobId").get(verifyJwt,getJob)

router.route("/recruiter/:recruiterId").get(verifyJwt,getJobByRecuiter)

export default router;
