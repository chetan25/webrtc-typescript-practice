import React, { useState } from "react";
import { styled } from "@mui/system";
import ResizeRoomButtom from "./ResizeRoomButtom";
import VideoContainer from "./VideoContainer";
import RoomButtons from "./RoomButtons/RoomButtons";

const MainContainer = styled("div")({
  position: "absolute",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#202225",
});

const fullScreenStyle = {
  width: "100%",
  height: "100vh",
};

const minimizeStyle = {
  bottom: "0px",
  right: "0px",
  width: "30%",
  height: "40vh",
};

const Room = () => {
  const [isRoomMinimize, setRoomMinimize] = useState(false);

  const roomResizeHanlder = () => {
    setRoomMinimize(!isRoomMinimize);
  };

  return (
    <MainContainer style={isRoomMinimize ? minimizeStyle : fullScreenStyle}>
      <VideoContainer />
      <RoomButtons />
      <ResizeRoomButtom
        isRoomMinimize={isRoomMinimize}
        handleRoomResize={roomResizeHanlder}
      />
    </MainContainer>
  );
};

export default Room;
