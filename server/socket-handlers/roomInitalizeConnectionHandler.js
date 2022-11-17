const roomInitalizeConnectionHandler = (socket, data) => {
  const { connUserSocketId } = data;

  console.log({ connUserSocketId }, "conn-init-roomInitalizeConnectionHandler");
  const initData = { connUserSocketId: socket.id };

  socket.to(connUserSocketId).emit("conn-init", initData);
};

module.exports = roomInitalizeConnectionHandler;
