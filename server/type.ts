import type { Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import type { Socket } from "socket.io";

export interface TypedRequest extends Request {
  user: JwtPayload;
}

export interface TypedSocket extends Socket {
  user: JwtPayload | string;
}

export interface TypedResponse extends Response {}
