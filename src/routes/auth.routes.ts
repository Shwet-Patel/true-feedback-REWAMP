import { Router } from "express";
import authController from "@/controllers/auth.controller";

const router = Router();

router.post('/login', authController.loginHandler);
router.post('/refresh-token', authController.refreshTokenHandler);
router.post('/forgot-password', authController.forgotPasswordHandler);
router.post('/reset-password', authController.resetPasswordHandler);
router.post('/resend-otp', authController.resendOtpHandler);
router.post('/logout', authController.logoutHandler);
router.get('/check-username',authController.checkUsernameAvailabilityHandler);

export default router;