import { Request, Response, NextFunction } from "express";
import { get } from "node:http";

const createPollHandler = async (req: Request, res: Response, next: NextFunction) => { };

const getAllPollsHandler = async (req: Request, res: Response, next: NextFunction) => { };

const getPollByIdHandler = async (req: Request, res: Response, next: NextFunction) => { };

const updatePollDetailsHandler = async (req: Request, res: Response, next: NextFunction) => { };;

const deletePollHandler = async (req: Request, res: Response, next: NextFunction) => { };

const updatePollResultStatusHandler = async (req: Request, res: Response, next: NextFunction) => { };

const addVoteHandler = async (req: Request, res: Response, next: NextFunction) => { };

const getResultsHandler = async (req: Request, res: Response, next: NextFunction) => { };

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