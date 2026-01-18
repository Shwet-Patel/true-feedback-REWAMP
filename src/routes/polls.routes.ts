import { Router } from "express";
import pollsController from "@/controllers/polls.controller";
import { asyncHandler } from "@/utils/asyncHandler.utility";

const router = Router();

router.post('/', asyncHandler(pollsController.createPollHandler));
router.get('/:id', asyncHandler(pollsController.getAllPollsHandler));
router.get('/all', asyncHandler(pollsController.getAllPollsHandler));
router.put('/:id', asyncHandler(pollsController.updatePollDetailsHandler));
router.patch('/:id', asyncHandler(pollsController.updatePollResultStatusHandler));
router.delete('/:id', asyncHandler(pollsController.deletePollHandler));


router.post('/:id/vote', asyncHandler(pollsController.addVoteHandler));
router.get('/:id/results', asyncHandler(pollsController.getResultsHandler));

export default router;