import { Server, Socket } from "socket.io";
import verifySocketJwt from "./middleware/auth-socket";
import newConnectionHandler from "./socket-handlers/newConnectionHandler.js";
import disconnectHandler from "./socket-handlers/disconnectHandler";
import {
  directMessageHandler,
  chatHistoryHandler,
} from "./socket-handlers/directMessageHandler";
import roomCreateHandler from "./socket-handlers/roomCreateHandler";
import { setSocketServerInstance, getAllOnlineUsers } from "./store";
import roomJoinHandler from "./socket-handlers/roomJoinHandler";
import roomLeaveHandler from "./socket-handlers/roomLeaveHandler";
import roomInitalizeConnectionHandler from "./socket-handlers/roomInitalizeConnectionHandler";
import roomSignalDataHandler from "./socket-handlers/roomSignalDataHandler";
import { Server as HttpServer } from "http";

const registerSocketServer = (server: HttpServer) => {
  const io: Server = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  setSocketServerInstance(io);

  // middleware
  io.use((socket: Socket, next: () => void) => {
    verifySocketJwt(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = getAllOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log("User Connected");
    // new connection for saving new user connected
    newConnectionHandler(socket, io);
    emitOnlineUsers();

    //
    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    });

    socket.on("direct-chat-history", (data) => {
      chatHistoryHandler(socket, data);
    });

    socket.on("room-creeate", () => {
      roomCreateHandler(socket);
    });

    socket.on("room-join", (data) => {
      roomJoinHandler(socket, data);
    });

    socket.on("leave-room", (data) => {
      roomLeaveHandler(socket, data);
    });

    socket.on("conn-init", (data) => {
      roomInitalizeConnectionHandler(socket, data);
    });

    socket.on("conn-signal", (data) => {
      roomSignalDataHandler(socket, data);
    });

    // listen disconnect
    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, 8000);
};

export default registerSocketServer;
