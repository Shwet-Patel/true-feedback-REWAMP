import { Router } from "express";
import authController from "@/controllers/auth.controller";
import { asyncHandler } from "@/utils/asyncHandler.utility";
import { validate } from "@/middlewares/validation.middleware";
import { forgotPasswordSchema, resetPasswordSchema , loginSchema, verifyOtpSchema } from "@/validations/auth.validation";

const router = Router();

router.post('/login', validate(loginSchema, 'body') ,asyncHandler(authController.loginHandler));
router.post('/logout', asyncHandler(authController.logoutHandler));
router.post('/refresh-token', asyncHandler(authController.refreshTokenHandler));
router.post('/forgot-password', validate(forgotPasswordSchema, 'body') ,asyncHandler(authController.forgotPasswordHandler));
router.post('/reset-password', validate(resetPasswordSchema, 'body'), asyncHandler(authController.resetPasswordHandler));
router.post('/verify-otp', validate(verifyOtpSchema, 'body') , asyncHandler(authController.verifyOtpHandler));

export default router;