import { Router } from "express";
import authRoutes from "@/routes/auth.routes";
import pollsRoutes from "@/routes/polls.routes";
import messagesRoutes from "@/routes/messages.routes";
import userRoutes from "@/routes/user.routes";

const router = Router();

//auth routes
router.use('/auth', authRoutes);

//user routes
router.use('/users', userRoutes);

//polls routes
router.use('/polls', pollsRoutes);

//messages routes
router.use('/messages', messagesRoutes);


export default router;