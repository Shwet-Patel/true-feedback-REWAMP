import { Router } from "express";
import userController from "@/controllers/user.controller";

const router = Router();

router.post("/", userController.registerUserHandler);

router.get('/accpt-meesage-status', userController.getAcceptMessageStatusHandler);

router.get('/get-user-details', userController.getUserDetailsHandler);



export default router;