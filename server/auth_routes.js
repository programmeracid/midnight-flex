import express from "express";
import { registerUser, loginUser, logoutUser, updateProfilePic, checkAuth } from "./auth_controller.js";
import protect from "./auth_middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", checkAuth);
router.put("/updateprofilepic", protect, updateProfilePic);

export default router;
