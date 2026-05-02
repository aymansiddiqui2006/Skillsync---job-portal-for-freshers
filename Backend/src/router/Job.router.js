import { Router } from "express";
import verifyJwt from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  uploadJob,
  updateJob,
  deleteJob,
  getAllJob,
  getJob,
  getJobByRecuiter,
  getRecommendedJobs,
} from "../controller/job.controller.js";

const router = Router();

// POST JOB
router.post(
  "/post",
  verifyJwt,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "DataFile", maxCount: 1 },
  ]),
  uploadJob,
);

// GET ALL JOBS
router.get("/", verifyJwt, getAllJob);

// GET JOB BY RECRUITER
router.get("/recruiter/:recruiterId", verifyJwt, getJobByRecuiter);

// UPDATE JOB
router.patch(
  "/:jobId",
  verifyJwt,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "DataFile", maxCount: 1 },
  ]),
  updateJob,
);

// DELETE JOB
router.patch("/:jobId/close", verifyJwt, deleteJob);

router.get("/recommended-jobs", verifyJwt, getRecommendedJobs);

// GET SINGLE JOB
router.get("/:jobId", verifyJwt, getJob);



export default router;
