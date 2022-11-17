const { removeConnection, getActiveRooms } = require("../store");
const roomLeaveHandler = require("./roomLeaveHandler");

const disconnectHandler = async (socket) => {
  // if user in room
  const activeRooms = getActiveRooms();

  activeRooms.forEach((room) => {
    const userInRoom = room.participants.some((p) => p.socketId === socket.id);
    if (userInRoom) {
      roomLeaveHandler(socket, { roomId: room.roomId });
    }
  });

  removeConnection(socket.id);
};

module.exports = disconnectHandler;
