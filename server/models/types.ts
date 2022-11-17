import { Document, Types } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  friends: Types.DocumentArray<User>[];
}

export interface Invitation extends Document {
  receiverId: User["_id"];
  senderId: User["_id"];
}

export interface Message extends Document {
  author: User["_id"];
  content: string;
  date: Date;
  type: string;
}

export interface Conversation extends Document {
  participants: Types.DocumentArray<User>[];
  messages: Types.DocumentArray<Message>[];
}
