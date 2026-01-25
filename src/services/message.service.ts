import { GEMINI_API_KEY } from "@/configs/env-config";
import { AppEror } from "@/errors/app.error";
import { deleteMessageById, getMessageById, getMessages, sendMessage } from "@/repositories/message.repository";
import { findUserByUsername } from "@/repositories/user.repository";
import { sendMessageData } from "@/validations/message.validation";
import { PaginationData } from "@/validations/shared.validation";
import { GoogleGenerativeAI } from "@google/generative-ai";

const sendMessageService = async (data: sendMessageData) => {
  //step 1 : check user exists
  const user = await findUserByUsername(data.username);
  if (!user) {
    throw new AppEror("User not found", 404);
  }

  //step 2 : check if user is accepting messages
  if (!user.is_accepting_messages) {
    throw new AppEror("User is not accepting messages", 403);
  }

  //step 3 : save message to database
  const result = await sendMessage(user.user_id, data);
  return result;
};

const getMessagesService = async (
  userId: string,
  paginationData: PaginationData,
) => {
  const result = await getMessages(userId, paginationData);
  return result;
};

const deleteMessageService = async (userId: string, messageId: number) => {
    // step 1 : check message id is valid.
    const message = await getMessageById(messageId);
    if (!message) {
        throw new AppEror('invalid message id', 404);
    }

    // step 2 : check message belongs to this user
    if (message.to_user_id !== Number(userId)) {
        throw new AppEror('this message does not belong to you', 400);
    }

    //step 3 : delete the message
    const result = await deleteMessageById(messageId);
    return result;
}

const getMessageSuggestionsService = async () => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction:
      "Your job is to suggest questions for an anonymous social messaging platform like Qooh.me. it is okay to cover personal or sensitive topics.Ensure the questions are spicy which makes user frustrate in a fun way. return response in a single string where each response is separated by a ||. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?",
  });

  const prompt =
    "Create a list of three open-ended and engaging questions formatted as a single string.";
  const result = await model.generateContent(prompt);

  if (!result || !result.response.candidates) {
    throw new AppEror("Failed to generate message suggestions", 500);
  }

  const messages = result.response.candidates[0].content.parts[0].text;
  return messages;
};

export default {
  sendMessageService,
  getMessagesService,
  deleteMessageService,
  getMessageSuggestionsService,
};
