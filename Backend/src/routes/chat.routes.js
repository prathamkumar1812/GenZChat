import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {accessChat,fetachChat,createGroupChat,addToGroupChat,removeFromGroupChat} from "../controllers/chat.controller.js";

const router = Router();

router.route("/").post(verifyJWT,accessChat).get(verifyJWT,fetachChat);
router.route("/group").post(verifyJWT,createGroupChat);
router.route("/group/add").put(verifyJWT,addToGroupChat);
router.route("/group/remove").put(verifyJWT,removeFromGroupChat);
// router.route("/login").post(loginUser);
// //secure routes
// router.route("/logout").post( verifyJWT,logoutUser);
// router.route("/refresh-token").post(refressAccessToken);

export default router;