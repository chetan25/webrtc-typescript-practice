const { addNewConnection } = require("../store");
const {
  updatePendingInvitations,
  updateFriends,
  updateRooms,
} = require("./updates");

const newConnectionHandler = async (socket, io) => {
  const user = socket.user;
  addNewConnection(socket.id, user.userId);

  // update pending invitations
  updatePendingInvitations(user.userId);

  // update friends
  updateFriends(user.userId);

  // update activeRooms
  setTimeout(() => {
    updateRooms(socket.id);
  }, 500);
};

module.exports = newConnectionHandler;
