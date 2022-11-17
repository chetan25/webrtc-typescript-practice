import {
  ChatActions,
  ChatActionType,
  ChatDetails,
  ChatState,
} from "store/store-type";

export const ChatInitialState: ChatState = {
  choosenChatDetails: {} as ChatDetails,
  chatType: null,
  messages: [],
};

const reducer = (state = ChatInitialState, action: ChatActionType) => {
  switch (action.type) {
    case ChatActions.SET_CHAT_TYPE:
      return {
        ...state,
        chatType: action.chatType,
      };
    case ChatActions.SET_CHOOSEN_CHAT_DETAILS:
      return {
        ...state,
        choosenChatDetails: action.chatDetails,
        chatType: action.chatType,
        messages: [],
      };
    case ChatActions.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};

export default reducer;
