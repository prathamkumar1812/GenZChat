import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { sendMessage,fetchMessage} from "../controllers/message.controller.js";
const router = Router();

router.route("/").post(verifyJWT,sendMessage);
router.route("/:chatId").get(verifyJWT,fetchMessage);
// router.route("/login").post(loginUser);
// //secure routes
// router.route("/logout").post( verifyJWT,logoutUser);
// router.route("/refresh-token").post(refressAccessToken);

export default router;