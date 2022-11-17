import { Schema, Model, model } from "mongoose";
import { Message } from "./types";

const messageSchema = new Schema<Message, Model<Message>>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  content: { type: String },
  date: { type: Date },
  type: { type: String },
});

module.exports = model("Message", messageSchema);
