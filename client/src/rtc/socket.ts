import io, { Socket } from "socket.io-client";
import {
  sendPendingFriendInvitation,
  setFriends,
  setOnlineUsers,
} from "store/actions/friends";
import { updateRoomDetails, updateActiveRooms } from "./roomHandler";
import store from "store/store";
import { updateDirectChatHistoryIfActive } from "shared/utils/chat";
import {
  prepareNewPeerConnection,
  handleSignallingData,
  handleParticipantLeave,
} from "./webrtcHanlder";
import Peer from "simple-peer";

let socket: Socket | null = null;

export const connectSocket = (user: { token: string }) => {
  socket = io("http://localhost:5000", {
    auth: {
      token: user.token,
    },
  });

  socket.on("connect", () => {
    console.log("successfully connected");
    console.log(socket!.id);
  });

  // custom
  socket.on("invitations", (data) => {
    const { pendingInvitations } = data;
    console.log({ pendingInvitations }, "invitations");
    store.dispatch(sendPendingFriendInvitation(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    console.log(friends, "friends");
    store.dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    console.log("Online users", onlineUsers);
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on("direct-chat-history", (data) => {
    console.log({ data }, "direct-chat-history");
    updateDirectChatHistoryIfActive(data);
  });

  socket.on("room-create", (data) => {
    const { roomDetails } = data;
    updateRoomDetails(roomDetails);
  });

  socket.on("active-rooms", (data) => {
    const { activeRooms } = data;
    updateActiveRooms(activeRooms);
  });

  socket.on("conn-prepare", (data) => {
    console.log("Prepare connection", data);

    const { connUserSocketId } = data;
    prepareNewPeerConnection(connUserSocketId, false);

    socket!.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    console.log("conn-init", connUserSocketId);
    prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("conn-signal", (data) => {
    handleSignallingData(data);
  });

  socket.on("participant-left", (data) => {
    handleParticipantLeave(data);
  });
};

export const sendDirectMessage = (data: {
  receiverUserId: string;
  content: string;
}) => {
  console.log(data);
  socket!.emit("direct-message", data);
};

export const getDirectChatHistory = (data: any) => {
  socket!.emit("direct-chat-history", data);
};

export const createSocketNewRoom = () => {
  socket!.emit("room-creeate");
};

export const joinARoom = (data: { roomId: string }) => {
  socket!.emit("room-join", data);
};

export const exitRoom = (data: { roomId: string }) => {
  socket!.emit("leave-room", data);
};

export const signalPeerData = (data: {
  signal: Peer.SignalData;
  connUserSocketId: string;
}) => {
  socket!.emit("conn-signal", data);
};
