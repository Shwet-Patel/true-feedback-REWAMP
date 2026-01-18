import { Router } from "express";
import userController from "@/controllers/user.controller";
import { userRegistrationSchema } from "@/validations/user.validation";
import { asyncHandler } from "@/utils/asyncHandler.utility";
import { validate } from "@/middlewares/validation.middleware";

const router = Router();

router.post("/", validate(userRegistrationSchema,'body') ,asyncHandler(userController.registerUserHandler));
router.get('/accept-message-status', asyncHandler(userController.getAcceptMessageStatusHandler));
router.get('/get-user-details', asyncHandler(userController.getUserDetailsHandler));

export default router;