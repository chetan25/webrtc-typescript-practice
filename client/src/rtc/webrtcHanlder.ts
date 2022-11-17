import { setLocalStream, setRemoteStreams } from "store/actions/roomAction";
import store from "store/store";
import Peer, { Instance } from "simple-peer";
import { signalPeerData } from "./socket";
import { RemoteStream, LocalStream } from "store/store-type";

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  audio: true,
  video: true,
};

export const getLocalStreamPreview = (
  onlyAudio = false,
  callbackFn: () => void
) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream: LocalStream) => {
      console.log("streamstream", stream);
      store.dispatch(setLocalStream(stream));
      callbackFn();
    })
    .catch((err) => {
      console.log(err);
      console.log("Error getting access to local stream");
    });
};

let peerConnections = {} as Record<string, Instance>;

const getConfiguration = () => {
  // get iac for connection
  // if direct connection is not possible
  const turnIceServers = null;

  if (turnIceServers) {
    return {
      iceServers: [
        {
          urls: "",
        },
      ],
    };
    // Todo use Turn server creds
  } else {
    console.warn("Using only STUN server");
    // for local network
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302", // free stun server
        },
      ],
    };
  }
};

export const prepareNewPeerConnection = (
  socketId: string,
  isInitiator: boolean
) => {
  const localStream = store.getState().room.localStream;
  console.log({ localStream });
  if (isInitiator) {
    console.log("new peer connection as isInitiator");
  } else {
    console.log("new peer connection as not isInitiator");
  }

  peerConnections[socketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream!,
  });

  peerConnections[socketId]!.on("signal", (data: Peer.SignalData) => {
    const signalData = {
      signal: data,
      connUserSocketId: socketId,
    };

    console.log({ peerConnections });
    // pass signalling data to other users
    signalPeerData(signalData);
  });

  peerConnections[socketId]!.on("stream", (remoteStream: RemoteStream) => {
    // add new remote stream to store
    console.log("Direct connection established");
    // which user the stream belongs to
    remoteStream.connUserSocketId = socketId;

    // update store
    addNewRemoteStream(remoteStream);
  });
};

export const handleSignallingData = ({
  connUserSocketId,
  signal,
}: {
  connUserSocketId: string;
  signal: string | Peer.SignalData;
}) => {
  console.log("handleSignallingData");

  if (peerConnections[connUserSocketId]) {
    peerConnections[connUserSocketId]!.signal(signal);
  }
};

const addNewRemoteStream = (remoteStream: RemoteStream) => {
  const allRemoteStreams = store.getState().room.remoteStreams;

  const newStreams = [...allRemoteStreams, remoteStream];

  store.dispatch(setRemoteStreams(newStreams));
};

export const closeAllPeerConnections = () => {
  Object.entries(peerConnections).forEach((peerObject) => {
    const connUserSocketId = peerObject[0];
    if (peerConnections[connUserSocketId]) {
      peerConnections[connUserSocketId]!.destroy();

      delete peerConnections[connUserSocketId];
    }
  });
};

export const handleParticipantLeave = ({
  connUserSocketId,
}: {
  connUserSocketId: string;
}) => {
  if (peerConnections[connUserSocketId]) {
    peerConnections[connUserSocketId]!.destroy();

    delete peerConnections[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;

  const newStreams = remoteStreams.filter((st) => {
    return st.connUserSocketId !== connUserSocketId;
  });

  store.dispatch(setRemoteStreams(newStreams));
};

export const switchOutgoingTracks = (stream: LocalStream) => {
  for (let socket_id in peerConnections) {
    for (let index in peerConnections[socket_id]!.streams[0]!.getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peerConnections[socket_id]!.streams[0]!.getTracks()[index]!.kind ===
          stream.getTracks()[index2]!.kind
        ) {
          peerConnections[socket_id]!.replaceTrack(
            peerConnections[socket_id]!.streams[0]!.getTracks()[index]!,
            stream.getTracks()[index2]!,
            peerConnections[socket_id]!.streams[0]!
          );
          break;
        }
      }
    }
  }
};
