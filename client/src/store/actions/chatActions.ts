import { AppDispatch } from "store/store";
import { ChatActions, ChatTypes, ChatDetails, Message } from "store/store-type";

export const chatTypes = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
};

// export const chatActions = {
//   SET_CHOOSEN_CHAT_DETAILS: "CHAT_SET_CHOOSEN_CHAT_DETAILS",
//   SET_MESSAGES: "CHAT_SET_MESSAGES",
//   SET_CHAT_TYPE: "CHAT_SET_CHAT_TYPE",
// };

export const getActions = (dispatch: AppDispatch) => {
  return {
    setChoosenChatDetails: (details: ChatDetails, chatType: ChatTypes) =>
      dispatch(setChoosenChatDetails(details, chatType)),
  };
};

export const setChoosenChatDetails = (
  details: ChatDetails,
  chatType: ChatTypes
) => {
  return {
    type: ChatActions.SET_CHOOSEN_CHAT_DETAILS,
    chatType: chatType,
    chatDetails: details,
  };
};

export const setMessages = (messages: Message[]) => {
  return {
    type: ChatActions.SET_MESSAGES,
    messages,
  };
};
