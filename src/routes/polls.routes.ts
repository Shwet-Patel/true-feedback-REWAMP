import { Router } from "express";
import pollsController from "@/controllers/polls.controller";
import { asyncHandler } from "@/utils/asyncHandler.utility";
import { authenticate } from "@/middlewares/authenticate.middleware";
import { validate } from "@/middlewares/validation.middleware";
import { createPollSchema, pollIdSchema, toggleResultStatusSchema } from "@/validations/poll.validation";
import { paginationSchema } from "@/validations/shared.validation";

const router = Router();

// protected routes
router.post('/', authenticate , validate(createPollSchema,'body') ,asyncHandler(pollsController.createPollHandler));
router.get('/all', authenticate , validate(paginationSchema,'query'), asyncHandler(pollsController.getAllPollsHandler));
router.put('/:id', authenticate , validate(pollIdSchema,'params') , validate(createPollSchema, 'body' ) , asyncHandler(pollsController.updatePollDetailsHandler));
router.patch('/:id', authenticate , validate(pollIdSchema, 'params') , validate(toggleResultStatusSchema , 'body') , asyncHandler(pollsController.updatePollResultStatusHandler));
router.delete('/:id', authenticate , validate(pollIdSchema,'params') , asyncHandler(pollsController.deletePollHandler));


router.get('/:id', validate(pollIdSchema,'params') , asyncHandler(pollsController.getPollByIdHandler));
router.post('/:id/vote', asyncHandler(pollsController.addVoteHandler));
router.get('/:id/results', asyncHandler(pollsController.getResultsHandler));

export default router;