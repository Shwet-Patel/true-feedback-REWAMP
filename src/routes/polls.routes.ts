import { Router } from "express";
import pollsController from "@/controllers/polls.controller";
import { asyncHandler } from "@/utils/asyncHandler.utility";
import { authenticate } from "@/middlewares/authenticate.middleware";
import { validate } from "@/middlewares/validation.middleware";
import { createPollSchema, pollIdSchema, toggleResultStatusSchema, voteSchema } from "@/validations/poll.validation";
import { paginationSchema } from "@/validations/shared.validation";

const router = Router();

/**
 * @openapi
 * /api/polls:
 *   post:
 *     tags: [poll]
 *     summary: Create poll
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [poll_name, poll_start_dtm, poll_end_dtm, poll_title, poll_description, candidates]
 *             properties:
 *               poll_name: { type: string, minLength: 1, maxLength: 2000 }
 *               poll_start_dtm: { type: string, format: date-time }
 *               poll_end_dtm: { type: string, format: date-time }
 *               poll_title: { type: string, minLength: 1, maxLength: 2000 }
 *               poll_description: { type: string }
 *               is_result_public: { type: boolean, default: false }
 *               candidates: { type: object, additionalProperties: { type: integer, enum: [0] }, description: "Candidate names as keys, value 0" }
 *           examples:
 *             full:
 *               value:
 *                 poll_name: "Weekly Poll"
 *                 poll_start_dtm: "2025-02-01T00:00:00Z"
 *                 poll_end_dtm: "2025-02-07T23:59:59Z"
 *                 poll_title: "Best day of the week?"
 *                 poll_description: "Vote for your favorite"
 *                 is_result_public: true
 *                 candidates: { "Monday": 0, "Tuesday": 0, "Wednesday": 0 }
 *             minimal:
 *               value:
 *                 poll_name: "Quick Poll"
 *                 poll_start_dtm: "2025-02-01T00:00:00Z"
 *                 poll_end_dtm: "2025-02-02T00:00:00Z"
 *                 poll_title: "Yes or No?"
 *                 poll_description: ""
 *                 candidates: { "Yes": 0, "No": 0 }
 *     responses:
 *       200:
 *         description: Poll created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "poll created successfully" }
 *                 data: { $ref: "#/components/schemas/Poll" }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.post('/', authenticate , validate(createPollSchema,'body') ,asyncHandler(pollsController.createPollHandler));

/**
 * @openapi
 * /api/polls/all:
 *   get:
 *     tags: [poll]
 *     summary: Get all polls for authenticated user (paginated)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Polls retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "poll data retrieved successfully" }
 *                 data: { type: array, items: { $ref: "#/components/schemas/Poll" } }
 *                 meta: { $ref: "#/components/schemas/Meta" }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.get('/all', authenticate , validate(paginationSchema,'query'), asyncHandler(pollsController.getAllPollsHandler));

/**
 * @openapi
 * /api/polls/{id}:
 *   get:
 *     tags: [poll]
 *     summary: Get poll by ID (public)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       200:
 *         description: Poll retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "poll data retrieved successfully" }
 *                 data: { $ref: "#/components/schemas/Poll" }
 *       404:
 *         description: Poll not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.get('/:id', validate(pollIdSchema,'params') , asyncHandler(pollsController.getPollByIdHandler));

/**
 * @openapi
 * /api/polls/{id}:
 *   put:
 *     tags: [poll]
 *     summary: Update poll (only before poll start)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [poll_name, poll_start_dtm, poll_end_dtm, poll_title, poll_description, candidates]
 *             properties:
 *               poll_name: { type: string, minLength: 1, maxLength: 2000 }
 *               poll_start_dtm: { type: string, format: date-time }
 *               poll_end_dtm: { type: string, format: date-time }
 *               poll_title: { type: string, minLength: 1, maxLength: 2000 }
 *               poll_description: { type: string }
 *               is_result_public: { type: boolean }
 *               candidates: { type: object, additionalProperties: { type: integer } }
 *           example:
 *             poll_name: "Updated Poll"
 *             poll_start_dtm: "2025-02-01T00:00:00Z"
 *             poll_end_dtm: "2025-02-07T23:59:59Z"
 *             poll_title: "Updated Title"
 *             poll_description: "Updated description"
 *             is_result_public: false
 *             candidates: { "A": 0, "B": 0 }
 *     responses:
 *       200:
 *         description: Poll updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "poll updated successfully" }
 *                 data: { $ref: "#/components/schemas/Poll" }
 *       400:
 *         description: Poll does not belong to user
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       404:
 *         description: Poll not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: Poll has started, cannot edit
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.put('/:id', authenticate , validate(pollIdSchema,'params') , validate(createPollSchema, 'body' ) , asyncHandler(pollsController.updatePollDetailsHandler));

/**
 * @openapi
 * /api/polls/{id}:
 *   patch:
 *     tags: [poll]
 *     summary: Toggle poll result visibility
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [is_result_public]
 *             properties:
 *               is_result_public: { type: boolean }
 *           example: { is_result_public: true }
 *     responses:
 *       200:
 *         description: Result status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "result status updated" }
 *                 data: { $ref: "#/components/schemas/Poll" }
 *       400:
 *         description: Poll does not belong to user
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       404:
 *         description: Poll not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.patch('/:id', authenticate , validate(pollIdSchema, 'params') , validate(toggleResultStatusSchema , 'body') , asyncHandler(pollsController.updatePollResultStatusHandler));

/**
 * @openapi
 * /api/polls/{id}:
 *   delete:
 *     tags: [poll]
 *     summary: Delete poll
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       200:
 *         description: Poll deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "poll deleted successfully" }
 *                 data: { $ref: "#/components/schemas/Poll" }
 *       400:
 *         description: Poll does not belong to user
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.delete('/:id', authenticate , validate(pollIdSchema,'params') , asyncHandler(pollsController.deletePollHandler));

/**
 * @openapi
 * /api/polls/{id}/vote:
 *   post:
 *     tags: [poll]
 *     summary: Cast vote (public). Cookie used to prevent duplicate votes from same device.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [candidate]
 *             properties:
 *               candidate: { type: string }
 *           example: { candidate: "Monday" }
 *     responses:
 *       200:
 *         description: Vote registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "vote registered succesfully" }
 *                 data: { type: "object", nullable: true, example: null }
 *       404:
 *         description: Poll not found or candidate not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: Poll not started or poll ended
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.post('/:id/vote', validate(pollIdSchema,'params') , validate(voteSchema , 'body') , asyncHandler(pollsController.addVoteHandler));

/**
 * @openapi
 * /api/polls/{id}/results:
 *   get:
 *     tags: [poll]
 *     summary: Get poll results (public, only when poll ended and results public)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       200:
 *         description: Poll results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "poll results fetched successfully" }
 *                 data:
 *                   type: array
 *                   items: { $ref: "#/components/schemas/PollResultCandidate" }
 *       403:
 *         description: Poll results are private
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       404:
 *         description: Poll not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: Poll has not ended yet
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.get('/:id/results', validate(pollIdSchema , 'params') , asyncHandler(pollsController.getResultsHandler));

export default router;