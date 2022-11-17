import { Schema, Model, model } from "mongoose";
import { Invitation } from "./types";

const invitationSchema = new Schema<Invitation, Model<Invitation>>({
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

// export default model<Invitation>("Invitation", invitationSchema);

// creating model
module.exports = model("Invitation", invitationSchema);
