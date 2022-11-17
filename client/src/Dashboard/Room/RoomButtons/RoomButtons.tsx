import React from "react";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import CameraButton from "./CameraButton";
import { getActions } from "store/actions/roomAction";
import { AppState } from "store/store-type";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RoomButtons = () => {
  const {
    localStream,
    isUserJoinedWithAudioOnly,
    screenSharingStream,
    isScreenSharingActive,
  } = useSelector((state: AppState) => state.room);
  const dispatch = useDispatch();
  const { setScreenSharingStream } = getActions(dispatch);

  return (
    <MainContainer>
      {!isUserJoinedWithAudioOnly && (
        <ScreenShareButton
          localStream={localStream!}
          setScreenSharingStream={setScreenSharingStream}
          screenSharingStream={screenSharingStream!}
          isScreenSharingActive={isScreenSharingActive}
        />
      )}
      <MicButton localStream={localStream!} />
      <CloseRoomButton />
      {!isUserJoinedWithAudioOnly && (
        <CameraButton localStream={localStream!} />
      )}
    </MainContainer>
  );
};

// const mapStoreStateToProps = ({ room }) => {
//   return { ...room };
// };

// const mapActionsToProps = (dispatch) => {
//   return {
//     ...getActions(dispatch),
//   };
// };

export default RoomButtons;
