import { openAlertMessage } from "./alertActions";
import * as api from "@/api";
import { AppDispatch } from "store/store";
import { FriendsAction } from "store/store-type";

// export const friendsAction = {
//   SET_FRIENDS: "FRIENDS.SET_FRIENDS",
//   SET_PENDING_INVITATION: "FRIENDS_SET_PENDING_INVITATION",
//   SET_ONLINE_USERS: "FRIENDS_SET_ONLINE_USERS",
// };

export const getAction = (dispatch: AppDispatch) => {
  return {
    sendFriendInvitation: (data: any, closeDialogHandler: () => void) =>
      dispatch(sendFriendInvitation(data, closeDialogHandler)),
    acceptFriendInvitation: (data: any) =>
      dispatch(acceptFriendInvitation(data)),
    rejectFriendInvitation: (data: any) =>
      dispatch(rejectFriendInvitation(data)),
  };
};

const acceptFriendInvitation = (data: any) => {
  return async (dispatch: AppDispatch) => {
    const response = await api.acceptFriendInvitation(data);
    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data!));
    } else {
      dispatch(openAlertMessage("Invitation has been accepted"));
    }
  };
};

const rejectFriendInvitation = (data: any) => {
  return async (dispatch: AppDispatch) => {
    const response = await api.rejectFriendInvitation(data);
    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data!));
    } else {
      dispatch(openAlertMessage("Invitation has been accepted"));
    }
  };
};

const sendFriendInvitation = (data: any, closeDialogHandler: () => void) => {
  return async (dispatch: AppDispatch) => {
    const response = await api.sendFriendInvitation(data);

    if (response.error!) {
      dispatch(openAlertMessage(response.exception?.response?.data!));
    } else {
      dispatch(openAlertMessage("Invitation has been sent"));
      closeDialogHandler();
    }
  };
};

export const sendPendingFriendInvitation = (pendingFriendInvitations: []) => {
  console.log({ pendingFriendInvitations });
  return {
    type: FriendsAction.SET_PENDING_INVITATION,
    pendingFriendInvitations,
  };
};

export const setFriends = (friends: []) => {
  return {
    type: FriendsAction.SET_FRIENDS,
    friends,
  };
};

export const setOnlineUsers = (onlineUsers: []) => {
  return {
    type: FriendsAction.SET_ONLINE_USERS,
    onlineUsers,
  };
};
