import z from "zod";

export const createPollSchema = z
  .object({
    poll_name: z.string().min(1).max(2000),
    poll_start_dtm: z.coerce.date(),
    poll_end_dtm: z.coerce.date(),
    poll_title: z.string().min(1).max(2000),
    poll_description: z.string(),
    is_result_public: z.boolean().default(false),
    candidates: z.record(z.string(), z.literal(0)),
  })
  .refine((data) =>
    new Date(data.poll_start_dtm).getTime() < new Date(data.poll_end_dtm).getTime()
    , { error: 'poll start date should be less then end date' });

export const pollIdSchema = z.object({
  id: z.coerce.number().positive()
});

export const toggleResultStatusSchema = z.object({
  is_result_public: z.boolean(),
});

export const voteSchema = z.object({
  candidate: z.string()
});

//types
export type voteData = z.infer<typeof voteSchema>;
export type pollIdData = z.infer<typeof pollIdSchema>;
export type createPollData = z.infer<typeof createPollSchema>;
export type toggleResultStatusData = z.infer<typeof toggleResultStatusSchema>;