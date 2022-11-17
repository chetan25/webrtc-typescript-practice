import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import type { Socket } from "socket.io";
// import type { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.SECRET;

const verifySocketJwt = (socket: Socket, next: NextFunction) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, SECRET!);
    // @ts-ignore
    socket.user = decoded;

    next();
  } catch (e) {
    const socketError = new Error("Not_Authorize");
    return next(socketError);
  }
};

export default verifySocketJwt;
