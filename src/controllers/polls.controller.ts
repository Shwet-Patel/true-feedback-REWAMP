import pollService from "@/services/poll.service";
import {
  createPollData,
  pollIdData,
  toggleResultStatusData,
  voteData,
} from "@/validations/poll.validation";
import { PaginationData } from "@/validations/shared.validation";
import { Request, Response } from "express";

const createPollHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.forbidden("authentication required");
  }

  const data = req.body as createPollData;
  const result = await pollService.createPollService(data, userId);

  return res.success(result, "poll created successfully");
};

const getAllPollsHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.forbidden("authentication required");
  }

  const paginationdata = req.validatedQuery as PaginationData;
  const result = await pollService.getAllPollsService(paginationdata, userId);
  return res.success(
    result.data,
    "poll data retrieved successfully",
    result.meta,
  );
};

const getPollByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params as unknown as pollIdData;
  const result = await pollService.getPollByIdService(id);
  return res.success(result, "poll data retrieved successfully");
};

const updatePollDetailsHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.forbidden("authentication required");
  }

  const { id } = req.params as unknown as pollIdData;
  const data = req.body as createPollData;
  const result = await pollService.updatePollService(id, data, userId);
  return res.success(result, "poll updated successfully");
};

const deletePollHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.forbidden("authentication required");
  }

  const { id } = req.params as unknown as pollIdData;
  const result = await pollService.deletePollService(id, userId);
  return res.success(result, "poll deleted successfully");
};

const updatePollResultStatusHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.forbidden("authentication required");
  }

  const { id } = req.params as unknown as pollIdData;
  const { is_result_public } = req.body as toggleResultStatusData;

  const result = await pollService.toggleResultStatusService(
    id,
    is_result_public,
    userId,
  );
  return res.success(result, "result status updated");
};

const addVoteHandler = async (req: Request, res: Response) => {
  const { id } = req.params as unknown as pollIdData;
  const { candidate } = req.body as voteData;

  // check if the cookie exists
  if (req.cookies?.[`voted_for_${id}`]) {
    console.log("caught ya!");
    return res.success(null, "vote registered succesfully");
  }

  const result = await pollService.addVoteService(id, candidate);

  // set cookie to mark this device.
  res.cookie(`voted_for_${result.poll_id}`, "yes", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year (surely no poll lasts longer then this)
  });

  return res.success(null, "vote registered succesfully");
};

const getResultsHandler = async (req: Request, res: Response) => {
  const { id } = req.params as unknown as pollIdData;
  const result = await pollService.getResults(id);
  return res.success(result, "poll results fetched successfully");
};

export default {
  createPollHandler,
  getAllPollsHandler,
  getPollByIdHandler,
  updatePollDetailsHandler,
  updatePollResultStatusHandler,
  addVoteHandler,
  getResultsHandler,
  deletePollHandler,
};
