import { Router } from "express";
import { registerUser, loginUser, refressAccessToken,logoutUser,getUser, serachUsers, checkstatus} from "../controllers/user.contoller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post
(upload.fields([
    {
        name:"avatar",
        maxCount:1
    }
]),registerUser);
router.route("/login").post(loginUser);
//secure routes
router.route("/logout").post( verifyJWT,logoutUser);
router.route("/refresh-token").post(refressAccessToken);
router.route("/me").get(verifyJWT,getUser);
router.route("/status/:id").get(checkstatus);
router.route('/').get(verifyJWT,serachUsers);

export default router;