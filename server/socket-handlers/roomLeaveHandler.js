const serverStore = require("../store");
const { updateRooms } = require("./updates");

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  const activeRooms = serverStore.getActiveRoom(roomId);

  if (activeRooms) {
    serverStore.leaveActiveRoom(roomId, socket.id);

    const updatedActiveRoom = serverStore.getActiveRoom(roomId);
    if (updatedActiveRoom) {
      console.log({ updatedActiveRoom });
      updatedActiveRoom.participants.forEach((pr) => {
        socket.to(pr.socketId).emit("participant-left", {
          connUserSocketId: socket.id,
        });
      });
    }

    updateRooms();
  }
};

module.exports = roomLeaveHandler;
