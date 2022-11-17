import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocanOffIcon from "@mui/icons-material/VideocamOff";
import { LocalStream } from "store/store-type";

const CameraButton = ({ localStream }: { localStream: LocalStream }) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const handleToggleCamera = () => {
    // check if joined with video
    localStream.getVideoTracks()![0]!.enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  return (
    <IconButton
      onClick={handleToggleCamera}
      style={{
        color: "white",
      }}
    >
      {cameraEnabled ? <VideocamIcon /> : <VideocanOffIcon />}
    </IconButton>
  );
};

export default CameraButton;
