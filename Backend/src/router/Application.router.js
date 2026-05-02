import { Router } from "express";

import verifyJwt from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

import {ApplyJob , FeedBack } from "../controller/Application.contoller.js";


const router = Router();

router.post(
  "/apply-job/:jobId",
  verifyJwt,
  upload.fields([
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  ApplyJob,
);

router.patch("/feedback/:ApplicationId", verifyJwt, FeedBack);



export default router;
