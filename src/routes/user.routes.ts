import { Router } from "express";
import userController from "@/controllers/user.controller";
import { userRegistrationSchema } from "@/validations/user.validation";
import { userNameSchema } from "@/validations/shared.validation";
import { asyncHandler } from "@/utils/asyncHandler.utility";
import { validate } from "@/middlewares/validation.middleware";

const router = Router();

router.post("/", validate(userRegistrationSchema,'body') ,asyncHandler(userController.registerUserHandler));
router.get('/accept-message-status', validate(userNameSchema,'query') , asyncHandler(userController.getAcceptMessageStatusHandler));
router.get('/get-user-details', validate(userNameSchema,'query') ,asyncHandler(userController.getUserDetailsHandler));
router.get('/check-username', validate(userNameSchema, 'query'), asyncHandler(userController.checkUsernameAvailabilityHandler));

export default router;