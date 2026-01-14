import { Router } from "express";
import pollsController from "@/controllers/polls.controller";

const router = Router();

router.post('/', pollsController.createPollHandler);
router.get('/:id', pollsController.getAllPollsHandler);
router.get('/all', pollsController.getAllPollsHandler);
router.put('/:id', pollsController.updatePollDetailsHandler);
router.patch('/:id', pollsController.updatePollResultStatusHandler);
router.delete('/:id', pollsController.deletePollHandler);


router.post('/:id/vote', pollsController.addVoteHandler);
router.get('/:id/results', pollsController.getResultsHandler);

export default router;