import pollService from "@/services/poll.service";
import { createPollData, pollIdData, toggleResultStatusData } from "@/validations/poll.validation";
import { PaginationData } from "@/validations/shared.validation";
import { Request, Response } from "express";

const createPollHandler = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.forbidden('authentication required');
    }

    const data = req.body as createPollData;
    const result = await pollService.createPollService(data, userId);

    return res.success(result, 'poll created successfully');
};

const getAllPollsHandler = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.forbidden('authentication required');
    }

    const paginationdata = req.query as unknown as PaginationData;
    const result = await pollService.getAllPollsService(paginationdata, userId);
    return res.success(result.data, 'poll data retrieved successfully', result.meta);
};

const getPollByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params as unknown as pollIdData;
    const result = await pollService.getPollByIdService(id);
    return res.success(result, 'poll data retrieved successfully');
};

const updatePollDetailsHandler = async (req: Request, res: Response) => { };;

const deletePollHandler = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.forbidden('authentication required');
    }

    const { id } = req.params as unknown as pollIdData;
    const result = await pollService.deletePollService(id,userId);
    return res.success(result, 'poll deleted successfully');
};

const updatePollResultStatusHandler = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.forbidden('authentication required');
    }

    const { id } = req.params as unknown as pollIdData;
    const { is_result_public } = req.body as toggleResultStatusData;

    const result = await pollService.toggleResultStatusService(id, is_result_public, userId);
    return res.success(result, 'result status updated');
};

const addVoteHandler = async (req: Request, res: Response) => { };

const getResultsHandler = async (req: Request, res: Response) => { };

export default {
    createPollHandler,
    getAllPollsHandler,
    getPollByIdHandler,
    updatePollDetailsHandler,
    updatePollResultStatusHandler,
    addVoteHandler,
    getResultsHandler,
    deletePollHandler
};