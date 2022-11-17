import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { AppState, LocalStream } from "store/store-type";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideoMainContainer = styled("div")({
  height: "50%",
  width: "50%",
  backgroundColor: "black",
  borderRadius: "8px",
});

const VideoEL = styled("video")({
  height: "100%",
  width: "100%",
});

const Video = ({
  stream,
  isLocalStream,
}: {
  stream: LocalStream;
  isLocalStream: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  console.log({ stream });
  useEffect(() => {
    if (videoRef.current) {
      //@ts-ignore
      const video: HTMLVideoElement = videoRef.current;
      video.srcObject = stream;
      // only for some browsers
      video!.onloadedmetadata = () => {
        video!.play();
      };
    }
  }, [stream]);

  return (
    <VideoMainContainer>
      <VideoEL ref={videoRef} autoPlay muted={isLocalStream} />
    </VideoMainContainer>
  );
};

const VideoContainer = () => {
  const { localStream, remoteStreams, screenSharingStream } = useSelector(
    (state: AppState) => state.room
  );
  console.log(localStream, remoteStreams, screenSharingStream);
  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream! : localStream!}
        isLocalStream
      />
      {remoteStreams.map((stream) => {
        return <Video stream={stream} isLocalStream={false} key={stream.id} />;
      })}
    </MainContainer>
  );
};

// const mapStoreStateToProps = ({ room }) => {
//   return {
//     ...room,
//   };
// };

export default VideoContainer;
