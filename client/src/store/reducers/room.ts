import { RoomActions, RoomState, RoomActionType } from "store/store-type";

export const RoomInitialState: RoomState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithAudioOnly: false,
};

const reducer = (state = RoomInitialState, action: RoomActionType) => {
  switch (action.type) {
    case RoomActions.OPEN_ROOM:
      return {
        ...state,
        isUserInRoom: action.isUserInRoom,
        isUserRoomCreator: action.isUserRoomCreator,
      };
    case RoomActions.SET_ROOM_DETAILS:
      return {
        ...state,
        roomDetails: action.roomDetails,
      };
    case RoomActions.SET_ACTIVE_ROOMS:
      return {
        ...state,
        activeRooms: action.activeRooms,
      };
    case RoomActions.SET_LOCAL_STREAM:
      console.log({ action });
      return {
        ...state,
        localStream: action.localStream,
      };
    case RoomActions.SET_AUDIO_ONLY:
      return {
        ...state,
        audioOnly: action.audioOnly,
      };
    case RoomActions.SET_REMOTE_STREAMS:
      return {
        ...state,
        remoteStreams: action.remoteStreams,
      };
    case RoomActions.SET_SCREEN_SHARE_STREAM:
      return {
        ...state,
        isScreenSharingActive: action.isScreenSharingActive,
        screenSharingStream: action.screenSharingStream,
      };
    case RoomActions.SET_IS_USER_JOINED_AUDIO_ONLY:
      return {
        ...state,
        isUserJoinedWithAudioOnly: action.isUserJoinedWithAudioOnly,
      };
    default:
      return state;
  }
};

export default reducer;
