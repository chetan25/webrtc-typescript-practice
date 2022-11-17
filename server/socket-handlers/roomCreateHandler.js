const { addNewActiveRoom, getActiveRooms } = require("../store");
const { updateRooms } = require("../socket-handlers/updates");

const roomCreateHandler = (socket) => {
  console.log("roomCreateHandler");
  const socketId = socket.id;
  const userId = socket.user.userId;
  const roomDetails = addNewActiveRoom(userId, socketId);

  // emit back to user info about room
  socket.emit("room-create", {
    roomDetails,
  });

  // emit active rooms
  updateRooms();
};

module.exports = roomCreateHandler;
