import { prisma } from "@/db/prisma";
import { createPollData } from "@/validations/poll.validation";
import {
  PaginationData,
  paginationSchema,
} from "@/validations/shared.validation";

export const createPoll = async (data: createPollData, userId: string) => {
  const currentTimestamp = new Date();
  return prisma.poll.create({
    data: {
      poll_name: data.poll_name,
      poll_start_dtm: data.poll_start_dtm,
      poll_end_dtm: data.poll_end_dtm,
      poll_title: data.poll_title,
      poll_description: data.poll_description,
      vote_count: 0,
      is_result_public: data.is_result_public,
      created_dtm: currentTimestamp,
      updated_dtm: currentTimestamp,
      candidates: data.candidates,
      created_by: Number(userId),
    },
  });
};

export const getPollById = async (pollId: number) => {
  return await prisma.poll.findFirst({
    where: {
      poll_id: pollId,
    },
  });
};

export const getPolls = async (
  paginationData: PaginationData,
  userId: string,
) => {
  const { page, limit } = paginationData;
  const offset = (page - 1) * limit;

  const data = await prisma.poll.findMany({
    where: {
      created_by: Number(userId),
    },
    skip: offset,
    take: limit,
    orderBy: {
      created_dtm: "desc",
    },
  });

  const totalPolls = await prisma.poll.count({
    where: {
      created_by: Number(userId),
    },
  });

  const meta = {
    currentPage: page,
    totalPages: Math.ceil(totalPolls / limit),
    totalItems: totalPolls,
    itemsPerPage: limit,
    hasNextPage: offset + limit < totalPolls,
    hasPreviousPage: offset > 0,
  };

  return { data, meta };
};

export const updatePoll = async (pollId: number, data: createPollData) => {
  const currentTimestamp = new Date();
  return await prisma.poll.update({
    where: {
      poll_id: pollId,
    },
    data: {
      poll_name: data.poll_name,
      poll_start_dtm: data.poll_start_dtm,
      poll_end_dtm: data.poll_end_dtm,
      poll_title: data.poll_title,
      poll_description: data.poll_description,
      is_result_public: data.is_result_public,
      updated_dtm: currentTimestamp,
      candidates: data.candidates,
    },
  });
};

export const toggleResultStatus = async (
  pollId: number,
  isResultPublic: boolean,
) => {
  const currentTimestamp = new Date();
  return await prisma.poll.update({
    where: {
      poll_id: pollId,
    },
    data: {
      is_result_public: isResultPublic,
      updated_dtm: currentTimestamp,
    },
  });
};

export const deletePoll = async (pollId: number) => {
  return await prisma.poll.delete({
    where: {
      poll_id: pollId,
    },
  });
};

export const addVote = async (pollId: number, candidate: string) => {
  await prisma.$executeRaw`
    UPDATE poll
    SET candidates = jsonb_set(
    candidates,
    ARRAY[${candidate}],
    to_jsonb((candidates->>${candidate})::int + 1),
    false
  ),
  vote_count = vote_count + 1
  WHERE id = ${pollId};
  `;
};
