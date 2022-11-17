import { RoomActions, Room } from "store/store-type";
import { AppDispatch } from "store/store";
import { LocalStream } from "store/store-type";

// export const roomActions = {
//   OPEN_ROOM: "ROOM_OPEN_ROOM",
//   SET_ROOM_DETAILS: "ROOM_SET_ROOM_DETAILS",
//   SET_ACTIVE_ROOMS: "ROOM_SET_ACTIVE_ROOMS",
//   SET_LOCAL_STREAM: "ROOM_SET_LOCAL_STREAM",
//   SET_REMOTE_STREAMS: "ROOM_SET_REMOTE_STREAMS",
//   SET_AUDIO_ONLY: "ROOM_SET_AUDIO_ONLY",
//   SET_SCREEN_SHARE_STREAM: "ROOM_SET_SCREEN_SHARE_STREAM",
//   SET_IS_USER_JOINED_AUDIO_ONLY: "ROOM_SET_IS_USER_JOINED_AUDIO_ONLY",
// };

export const setOpenRoom = (
  isUserRoomCreator = false,
  isUserInRoom = false
) => {
  return {
    type: RoomActions.OPEN_ROOM,
    isUserInRoom: isUserInRoom,
    isUserRoomCreator: isUserRoomCreator,
  };
};
export const setRoomDetails = (roomDetails: Room | null) => {
  return {
    type: RoomActions.SET_ROOM_DETAILS,
    roomDetails: roomDetails,
  };
};

export const setActiveRooms = (activeRooms: Room[]) => {
  return {
    type: RoomActions.SET_ACTIVE_ROOMS,
    activeRooms: activeRooms,
  };
};

export const setLocalStream = (stream: LocalStream | null) => {
  console.log("stream", stream);
  return {
    type: RoomActions.SET_LOCAL_STREAM,
    localStream: stream,
  };
};

export const setRemoteStreams = (remoteStreams: LocalStream[]) => {
  return {
    type: RoomActions.SET_REMOTE_STREAMS,
    remoteStreams: remoteStreams,
  };
};

export const setAudioOnly = (audioOnly: boolean) => {
  return {
    type: RoomActions.SET_AUDIO_ONLY,
    audioOnly: audioOnly,
  };
};

export const setScreenSharingStream = (stream: LocalStream | null) => {
  return {
    type: RoomActions.SET_SCREEN_SHARE_STREAM,
    isScreenSharingActive: !!stream,
    screenSharingStream: stream || null,
  };
};

export const setIsUserJoinedAudioOnly = (onlyWithAudio: boolean) => {
  return {
    type: RoomActions.SET_IS_USER_JOINED_AUDIO_ONLY,
    isUserJoinedWithAudioOnly: onlyWithAudio,
  };
};

export const getActions = (dispatch: AppDispatch) => {
  return {
    setAudioOnly: (onlyAudio: boolean) => dispatch(setAudioOnly(onlyAudio)),
    setScreenSharingStream: (stream: LocalStream | null) =>
      dispatch(setScreenSharingStream(stream)),
  };
};
