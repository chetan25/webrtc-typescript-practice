import store from "store/store";
import { setMessages } from "store/actions/chatActions";
import { Message } from "store/store-type";

export const updateDirectChatHistoryIfActive = (data: {
  participants: [];
  messages: Message[];
}) => {
  const { participants, messages } = data;

  // find id of user from token and id from active conversation
  const receiverId = store.getState().chat.choosenChatDetails?.id;
  const userId = store.getState().auth!.userDetails!.id;

  if (receiverId && userId) {
    const usersInCoversation = [receiverId, userId];

    updateChatHistoryIfSameConversationActive({
      participants,
      usersInCoversation,
      messages,
    });
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInCoversation,
  messages,
}: {
  participants: [];
  usersInCoversation: string[];
  messages: Message[];
}) => {
  const result = participants.every(function (participantId) {
    return usersInCoversation.includes(participantId);
  });

  if (result) {
    store.dispatch(setMessages(messages));
  }
};
