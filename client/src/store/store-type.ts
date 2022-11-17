// type Reducer<S, A> = (prevState: S, action: A) => S;

export type User = {
  email: string;
  id?: string;
  _id?: string;
  token: string;
  username: string;
};

export type AuthState = {
  userDetails: null | User;
};

export type AlertState = {
  showAlertMessage: boolean;
  alertMessageContent: null | string;
};

export type ChatDetails = {
  id: string;
  name: string;
  username: string;
};

export type Message = {
  _id: string | number;
  content: string;
  sameAuthor?: boolean;
  author: {
    username: string;
    _id?: string;
  };
  date: string;
  type?: string;
  sameDay?: boolean;
};

export type ChatState = {
  choosenChatDetails: null | ChatDetails;
  chatType: null | ChatTypes;
  messages: Message[];
};

export type Friend = {
  email: string;
  id: string;
  isOnline: boolean;
  username: string;
};

export type OnlineUser = {
  socketId: string;
  userId: string;
};

export type Invitation = {
  _id: string;
  senderId: {
    username: string;
    email: string;
  };
};

export type FriendsState = {
  friends: Friend[];
  pendingInvitations: Invitation[];
  onlineUsers: OnlineUser[];
};

export type Room = {
  createrUserName?: string;
  participants?: {
    socketId: string;
    userId: string;
  }[];
  roomCreator?: {
    socketId: string;
    userId: string;
  };
  roomId: string;
};

interface ConnectedUser {
  connUserSocketId?: string;
}
export interface RemoteStream extends MediaStream, ConnectedUser {}
export interface LocalStream extends MediaStream, ConnectedUser {}

export type RoomState = {
  isUserInRoom: boolean;
  isUserRoomCreator: boolean;
  roomDetails: null | Room;
  activeRooms: Room[];
  localStream: null | LocalStream;
  remoteStreams: LocalStream[];
  audioOnly: boolean;
  screenSharingStream: LocalStream | null;
  isScreenSharingActive: boolean;
  isUserJoinedWithAudioOnly: boolean;
};

export type AppState = {
  auth: AuthState;
  alert: AlertState;
  friends: FriendsState;
  chat: ChatState;
  room: RoomState;
};

export const enum AuthActions {
  "SET_USER_DETAILS" = "AUTH.SET_USER_DETAILS",
}

export type UserDetails = {
  _id?: string;
  id?: string;
  email: string;
  password: string;
} | null;

export type AuthActionType = {
  type: AuthActions.SET_USER_DETAILS;
  userDetails: UserDetails;
};

export const enum AlertActions {
  "OPEN_ALERT_MESSAGE" = "ALERT.OPEN_ALERT_MESSAGE",
  "CLOSE_ALERT_MESSAGE" = "ALERT.CLOSE_ALERT_MESSAGE",
}

export type AlertActionType =
  | { type: AlertActions.OPEN_ALERT_MESSAGE; content: string }
  | { type: AlertActions.CLOSE_ALERT_MESSAGE };

export const enum ChatActions {
  "SET_CHOOSEN_CHAT_DETAILS" = "CHAT_SET_CHOOSEN_CHAT_DETAILS",
  "SET_MESSAGES" = "CHAT_SET_MESSAGES",
  "SET_CHAT_TYPE" = "CHAT_SET_CHAT_TYPE",
}

export const enum ChatTypes {
  "DIRECT" = "DIRECT",
  "GROUP" = "GROUP",
}

export type ChatActionType =
  | {
      type: ChatActions.SET_CHOOSEN_CHAT_DETAILS;
      chatType: ChatTypes;
      chatDetails: ChatDetails;
    }
  | { type: ChatActions.SET_MESSAGES; messages: [] }
  | { type: ChatActions.SET_CHAT_TYPE; chatType: ChatTypes };

export const enum FriendsAction {
  "SET_FRIENDS" = "FRIENDS.SET_FRIENDS",
  "SET_PENDING_INVITATION" = "FRIENDS_SET_PENDING_INVITATION",
  "SET_ONLINE_USERS" = "FRIENDS_SET_ONLINE_USERS",
}

export type FriendsActionType =
  | { type: FriendsAction.SET_FRIENDS; friends: [] }
  | { type: FriendsAction.SET_PENDING_INVITATION; pendingFriendInvitations: [] }
  | { type: FriendsAction.SET_ONLINE_USERS; onlineUsers: [] };

export const enum RoomActions {
  "OPEN_ROOM" = "ROOM_OPEN_ROOM",
  "SET_ROOM_DETAILS" = "ROOM_SET_ROOM_DETAILS",
  "SET_ACTIVE_ROOMS" = "ROOM_SET_ACTIVE_ROOMS",
  "SET_LOCAL_STREAM" = "ROOM_SET_LOCAL_STREAM",
  "SET_REMOTE_STREAMS" = "ROOM_SET_REMOTE_STREAMS",
  "SET_AUDIO_ONLY" = "ROOM_SET_AUDIO_ONLY",
  "SET_SCREEN_SHARE_STREAM" = "ROOM_SET_SCREEN_SHARE_STREAM",
  "SET_IS_USER_JOINED_AUDIO_ONLY" = "ROOM_SET_IS_USER_JOINED_AUDIO_ONLY",
}

export type RoomActionType =
  | {
      type: RoomActions.OPEN_ROOM;
      isUserInRoom: boolean;
      isUserRoomCreator: boolean;
    }
  | { type: RoomActions.SET_ROOM_DETAILS; roomDetails: Room }
  | { type: RoomActions.SET_ACTIVE_ROOMS; activeRooms: Room[] }
  | { type: RoomActions.SET_LOCAL_STREAM; localStream: LocalStream }
  | { type: RoomActions.SET_REMOTE_STREAMS; remoteStreams: LocalStream[] }
  | { type: RoomActions.SET_AUDIO_ONLY; audioOnly: boolean }
  | {
      type: RoomActions.SET_SCREEN_SHARE_STREAM;
      isScreenSharingActive: boolean;
      screenSharingStream: LocalStream;
    }
  | {
      type: RoomActions.SET_IS_USER_JOINED_AUDIO_ONLY;
      isUserJoinedWithAudioOnly: boolean;
    };
