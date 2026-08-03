import { Router } from "express";
import { getCurrentUser, registerUser, loginUser, logoutUser } from "../controller/auth.controller";
import {authenticate} from "../middleware/auth.middleware";
const router = Router();

router.get("/me", authenticate, getCurrentUser);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
export default router;