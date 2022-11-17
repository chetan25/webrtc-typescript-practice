const roomSignalDataHandler = (socket, data) => {
  const { connUserSocketId, signal } = data;

  const signallingData = { signal, connUserSocketId: socket.id };

  console.log("roomSignalDataHandler", connUserSocketId);
  socket.to(connUserSocketId).emit("conn-signal", signallingData);
};

module.exports = roomSignalDataHandler;
