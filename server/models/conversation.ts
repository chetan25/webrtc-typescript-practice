import { Schema, Model, model } from "mongoose";
import { Conversation } from "./types";

const conversationSchema = new Schema<Conversation, Model<Conversation>>({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

module.exports = model("Conversation", conversationSchema);
