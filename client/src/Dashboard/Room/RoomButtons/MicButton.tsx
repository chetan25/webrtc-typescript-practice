import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import MicIconOffIcon from "@mui/icons-material/MicOff";
import { LocalStream } from "store/store-type";

const MicButton = ({ localStream }: { localStream: LocalStream }) => {
  const [micEnabled, setMicEnabled] = useState(true);

  const handleToggleMic = () => {
    localStream!.getAudioTracks()[0]!.enabled = !micEnabled;
    setMicEnabled(!micEnabled);
  };

  return (
    <IconButton
      onClick={handleToggleMic}
      style={{
        color: "white",
      }}
    >
      {micEnabled ? <MicIcon /> : <MicIconOffIcon />}
    </IconButton>
  );
};

export default MicButton;
