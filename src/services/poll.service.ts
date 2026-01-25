import { AppEror } from "@/errors/app.error";
import { createPoll, deletePoll, getPollById, getPolls, toggleResultStatus } from "@/repositories/poll.repository";
import { createPollData } from "@/validations/poll.validation";
import { PaginationData } from "@/validations/shared.validation";


const createPollService = async (data: createPollData, userId: string) => {
    const poll = await createPoll(data, userId);
    return poll;
}

const getPollByIdService = async (pollId: number) => {
    const poll = await getPollById(pollId);
    return poll;
}

const getAllPollsService = async (paginationData: PaginationData, userId: string) => {
    const result = await getPolls(paginationData, userId);
    return result;
}

const toggleResultStatusService = async (pollId: number, isResultPublic: boolean, userId: string) => {
    // step 1 : check if the poll exists
    const poll = await getPollById(pollId);
    if (!poll) {
        throw new AppEror('poll not found', 404);
    }

    // step 2 : check poll does belongs to this user
    if (poll.created_by !== Number(userId)) {
        throw new AppEror('poll does not belong to you', 400);
    }

    // step 3 : update the status
    const result = await toggleResultStatus(pollId, isResultPublic);
    return result;

}

const deletePollService = async (pollId: number, userId: string) => {
    // step 1 : check poll exists
    const poll = await getPollById(pollId);

    // step 2 : check if poll belongs to this user
    if (poll?.created_by !== Number(userId)) {
        throw new AppEror('this poll does not belong to you.', 400);
    }

    // step 3 : delete the poll
    const result = await deletePoll(pollId);
    return result;
}

export default {
    createPollService,
    getPollByIdService,
    getAllPollsService,
    toggleResultStatusService,
    deletePollService,
}