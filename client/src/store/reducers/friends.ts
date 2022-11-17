import {
  FriendsAction,
  FriendsState,
  FriendsActionType,
} from "store/store-type";

export const FriendsInitialState: FriendsState = {
  friends: [],
  pendingInvitations: [],
  onlineUsers: [],
};

const reducer = (state = FriendsInitialState, action: FriendsActionType) => {
  switch (action.type) {
    case FriendsAction.SET_PENDING_INVITATION:
      return {
        ...state,
        pendingInvitations: action.pendingFriendInvitations,
      };
    case FriendsAction.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case FriendsAction.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    default:
      return state;
  }
};

export default reducer;
