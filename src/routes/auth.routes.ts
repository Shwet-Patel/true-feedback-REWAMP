import { Router } from "express";
import authController from "@/controllers/auth.controller";

const router = Router();

router.post('/register',authController.registerHandler);
router.post('/login',authController.loginHandler);
router.post('/logout',authController.logoutHandler);

export default router;