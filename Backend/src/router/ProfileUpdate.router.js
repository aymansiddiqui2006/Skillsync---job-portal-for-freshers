
import {Router} from "express"
import {ChangePassword,DataUpadate,AvatarUpdate,ResumeUpload} from "../controller/UserProfileUpdate.controller.js"
import verifyJwt from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router=Router();


router.route('/password').patch(verifyJwt,ChangePassword)

router.route('/data').patch(verifyJwt,DataUpadate)

router.route('/avatar').patch(verifyJwt,upload.single("avatar"),AvatarUpdate)

router.route('/resume').patch(verifyJwt,upload.single("resume"),ResumeUpload)

export default router 