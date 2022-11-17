import { v4 as uuid } from "uuid";
import { Server } from "socket.io";

const connections = new Map<string, { userId: string }>();
let io: Server | null;

export type Participant = {
  userId: string;
  socketId: string;
};

export type Room = {
  roomId: string;
  roomCreator: {
    userId: string;
    socketId: string;
  };
  participants: Participant[];
};

let activeRooms: Room[] = [];

export const setSocketServerInstance = (ioInstance: Server) => {
  io = ioInstance;
};

export const getSocketServerInstance = () => {
  return io;
};

export const addNewConnection = (socketId: string, userId: string) => {
  connections.set(socketId, { userId });
};

export const removeConnection = (socketId: string) => {
  if (connections.has(socketId)) {
    connections.delete(socketId);
    console.log("deleted");
  }
};

export const getConnection = (socketId: string) => {
  return connections.get(socketId);
};

export const getOnlineUsers = (userId: string) => {
  const activeConnection: String[] = [];
  connections.forEach((value, key) => {
    if (value.userId === userId) {
      // key == socketId
      activeConnection.push(key);
    }
  });

  return activeConnection;
};

export const getAllOnlineUsers = () => {
  const onlineUsers: {
    socketId: string;
    userId: string;
  }[] = [];
  connections.forEach((value, key) => {
    onlineUsers.push({
      socketId: key,
      userId: value.userId,
    });
  });

  return onlineUsers;
};

export const addNewActiveRoom = (userId: string, socketId: string) => {
  const newRoom: Room = {
    roomId: uuid(),
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
  };

  activeRooms.push(newRoom);
  return newRoom;
};

export const getActiveRooms = () => {
  return activeRooms;
};

export const getActiveRoom = (roomId: string) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);

  return activeRoom
    ? {
        ...activeRoom,
      }
    : null;
};

export const joinActiveRoom = (roomId: string, participant: Participant) => {
  const room = activeRooms.find((room) => room.roomId === roomId);
  activeRooms = activeRooms.filter((room) => room.roomId != roomId);

  const updatedRoom: Room = {
    ...room!,
    participants: [...room!.participants, participant],
  };
  activeRooms.push(updatedRoom);
};

export const leaveActiveRoom = (roomId: string, socketId: string) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);

  if (activeRoom) {
    const copyActiveRoom = { ...activeRoom };

    copyActiveRoom.participants = copyActiveRoom.participants.filter(
      (pt) => pt.socketId != socketId
    );

    // update activeRooms
    activeRooms = activeRooms.filter((room) => room.roomId != roomId);

    if (copyActiveRoom.participants.length > 0) {
      activeRooms.push(copyActiveRoom);
    }
  }
};
