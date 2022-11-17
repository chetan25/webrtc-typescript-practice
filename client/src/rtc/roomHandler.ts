import store from "store/store";
import {
  setIsUserJoinedAudioOnly,
  setLocalStream,
  setOpenRoom,
  setRemoteStreams,
  setScreenSharingStream,
} from "store/actions/roomAction";
import { createSocketNewRoom, joinARoom, exitRoom } from "./socket";
import { setRoomDetails, setActiveRooms } from "store/actions/roomAction";
import * as webRTCHanlder from "./webrtcHanlder";
import { Room } from "store/store-type";

export const createNewRoom = () => {
  const successCallbackfn = () => {
    store.dispatch(setOpenRoom(true, true));

    const onlyAudio = store.getState().room.audioOnly;

    store.dispatch(setIsUserJoinedAudioOnly(onlyAudio));
    // update socket
    createSocketNewRoom();
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHanlder.getLocalStreamPreview(audioOnly, successCallbackfn);
};

export const updateRoomDetails = (roomDetails: Room) => {
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (activeRooms: Room[]) => {
  // store.dispatch(setActiveRooms(activeRooms));
  const friends = store.getState().friends.friends;
  const rooms: Room[] = [];
  // find all rooms where friend is a creator

  const userId = store.getState().auth.userDetails?._id;
  activeRooms.forEach((room) => {
    const isRoomCreatedByCurrentUser = room.roomCreator!.userId === userId;
    if (isRoomCreatedByCurrentUser) {
      rooms.push({ ...room, createrUserName: "Me" });
    }
    friends.forEach((friend) => {
      if (friend.id === room.roomCreator!.userId) {
        rooms.push({ ...room, createrUserName: friend.username });
      }
    });
  });

  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId: string) => {
  const successCallbackfn = () => {
    store.dispatch(setRoomDetails({ roomId }));
    const onlyAudio = store.getState().room.audioOnly;

    store.dispatch(setIsUserJoinedAudioOnly(onlyAudio));
    store.dispatch(setOpenRoom(false, true));
    joinARoom({ roomId });
  };
  const audioOnly = store.getState().room.audioOnly;
  webRTCHanlder.getLocalStreamPreview(audioOnly, successCallbackfn);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails!.roomId;

  const localStream = store.getState().room.localStream;
  console.log({ localStream });
  if (localStream) {
    localStream.getTracks().forEach((track) => {
      track.stop();
    });
    store.dispatch(setLocalStream(null));
  }

  const screenShareStream = store.getState().room.screenSharingStream;

  if (screenShareStream) {
    screenShareStream.getTracks().forEach((track) => {
      track.stop();
    });
    store.dispatch(setScreenSharingStream(null));
  }

  store.dispatch(setRemoteStreams([]));
  webRTCHanlder.closeAllPeerConnections();

  exitRoom({ roomId });

  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
