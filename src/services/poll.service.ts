import { AppEror } from "@/errors/app.error";
import {
  addVote,
  createPoll,
  deletePoll,
  getPollById,
  getPolls,
  toggleResultStatus,
  updatePoll,
} from "@/repositories/poll.repository";
import { createPollData } from "@/validations/poll.validation";
import { PaginationData } from "@/validations/shared.validation";

const createPollService = async (data: createPollData, userId: string) => {
  const poll = await createPoll(data, userId);
  return poll;
};

const getPollByIdService = async (pollId: number) => {
  const poll = await getPollById(pollId);
  return poll;
};

const getAllPollsService = async (
  paginationData: PaginationData,
  userId: string,
) => {
  const result = await getPolls(paginationData, userId);
  return result;
};

const updatePollService = async (
  pollId: number,
  data: createPollData,
  userId: string,
) => {
  // step 1 : check if the poll exists
  const poll = await getPollById(pollId);
  if (!poll) {
    throw new AppEror("poll not found", 404);
  }

  // step 2 : check poll does belongs to this user
  if (poll.created_by !== Number(userId)) {
    throw new AppEror("poll does not belong to you", 400);
  }

  // step 3 : check voting window is started. if it is then nothing can be edited.
  const currentTimestamp = new Date();
  if (currentTimestamp > poll.poll_start_dtm) {
    throw new AppEror("poll has started. can not edit it now.", 409);
  }

  // step 4 : update the data
  const updatedData = await updatePoll(pollId, data);
  return updatedData;
};

const toggleResultStatusService = async (
  pollId: number,
  isResultPublic: boolean,
  userId: string,
) => {
  // step 1 : check if the poll exists
  const poll = await getPollById(pollId);
  if (!poll) {
    throw new AppEror("poll not found", 404);
  }

  // step 2 : check poll does belongs to this user
  if (poll.created_by !== Number(userId)) {
    throw new AppEror("poll does not belong to you", 400);
  }

  // step 3 : update the status
  const result = await toggleResultStatus(pollId, isResultPublic);
  return result;
};

const deletePollService = async (pollId: number, userId: string) => {
  // step 1 : check poll exists
  const poll = await getPollById(pollId);

  // step 2 : check if poll belongs to this user
  if (poll?.created_by !== Number(userId)) {
    throw new AppEror("this poll does not belong to you.", 400);
  }

  // step 3 : delete the poll
  const result = await deletePoll(pollId);
  return result;
};

const addVoteService = async (pollId: number, candidate: string) => {
  // step 1 : check poll id is valid
  const poll = await getPollById(pollId);
  if (!poll) {
    throw new AppEror("poll not found", 404);
  }

  // step 2  : check voting window is on
  const currentTimestamp = new Date();
  if (currentTimestamp < poll.poll_start_dtm) {
    throw new AppEror("poll has not started yet", 409);
  }

  if (currentTimestamp > poll.poll_end_dtm) {
    throw new AppEror("poll has ended.", 409);
  }

  // step 3 : check if candidate is valid
  if (!poll.candidates || !Object.keys(poll.candidates).includes(candidate)) {
    throw new AppEror("candidate not found for this poll", 404);
  }

  // step 4 : add a vote
  await addVote(pollId, candidate);
  return poll;
};

const getResults = async (pollId: number) => {
  // step 1 : check poll id is valid
  const poll = await getPollById(pollId);
  if (!poll) {
    throw new AppEror("poll not found", 404);
  }

  // step 2 : check if poll is still going on
  const currentTimestamp = new Date();
  if (currentTimestamp < poll.poll_end_dtm) {
    throw new AppEror("poll has ended.", 409);
  }

  // step 3 : check if the results are public
  if (!poll.is_result_public) {
    throw new AppEror("poll results are private.", 403);
  }

  if (!poll.candidates) {
      throw new AppEror("internal server error", 500);
  }


  const candidatesObject = poll.candidates as Record<string, number>;
  const candidates = Object.keys(candidatesObject).map((candidate) => {
    const voteCount = candidatesObject[candidate];
    return {
      name: candidate,
      votes: voteCount,
    };
  });
  return candidates;
};

export default {
  createPollService,
  updatePollService,
  getPollByIdService,
  getAllPollsService,
  toggleResultStatusService,
  deletePollService,
  addVoteService,
  getResults,
};
