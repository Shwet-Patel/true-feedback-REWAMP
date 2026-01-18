import { Router } from "express";
import authController from "@/controllers/auth.controller";
import { asyncHandler } from "@/utils/asyncHandler.utility";

const router = Router();

router.post('/login', asyncHandler(authController.loginHandler));
router.post('/refresh-token', asyncHandler(authController.refreshTokenHandler));
router.post('/forgot-password', asyncHandler(authController.forgotPasswordHandler));
router.post('/reset-password', asyncHandler(authController.resetPasswordHandler));
router.post('/resend-otp', asyncHandler(authController.resendOtpHandler));
router.post('/logout', asyncHandler(authController.logoutHandler));
router.get('/check-username',asyncHandler(authController.checkUsernameAvailabilityHandler));

export default router;