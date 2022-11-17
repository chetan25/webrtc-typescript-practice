const serverStore = require("../store");
const { updateRooms } = require("./updates");

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participant = {
    userId: socket.user.userId,
    socketId: socket.id,
  };

  const roomDetails = serverStore.getActiveRoom(roomId);

  serverStore.joinActiveRoom(roomId, participant);

  // send info that they should pre for incoming webrtc connection
  roomDetails.participants.forEach((participant) => {
    console.log(participant.scoketId != socket.id);
    // not same as cuurent joined user
    if (participant.scoketId != socket.id) {
      console.log("conn-prepare");
      socket.to(participant.socketId).emit("conn-prepare", {
        connUserSocketId: socket.id,
      });
    }
  });

  updateRooms();
};

module.exports = roomJoinHandler;
