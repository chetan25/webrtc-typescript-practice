import React from "react";
import IconButton from "@mui/material/IconButton";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { switchOutgoingTracks } from "rtc/webrtcHanlder";
import { LocalStream } from "@/store/store-type";

const constraints = {
  audio: false,
  video: true,
};

type ScreenShareButtonProps = {
  localStream: LocalStream;
  setScreenSharingStream: (stream: LocalStream | null) => void;
  screenSharingStream: LocalStream;
  isScreenSharingActive: boolean;
};

const ScreenShareButton = ({
  localStream,
  setScreenSharingStream,
  screenSharingStream,
  isScreenSharingActive,
}: ScreenShareButtonProps) => {
  const handleScreenShare = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (e) {
        console.warn("Cannot access screen");
      }

      if (stream) {
        setScreenSharingStream(stream);
        // switch outgoing video to screen
        switchOutgoingTracks(stream);
      }
    } else {
      // switch outgoing screen to video
      switchOutgoingTracks(localStream);
      screenSharingStream!.getTracks()!.forEach((tr) => {
        tr.stop();
      });
      setScreenSharingStream(null);
    }
  };

  return (
    <IconButton onClick={handleScreenShare} style={{ color: "white" }}>
      {isScreenSharingActive ? <ScreenShareIcon /> : <StopScreenShareIcon />}
    </IconButton>
  );
};

export default ScreenShareButton;
