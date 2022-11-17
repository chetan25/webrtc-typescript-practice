import { Schema, Model, model } from "mongoose";
import { User } from "./types";

const userSchema = new Schema<User, Model<User>>({
  email: {
    type: String,
    unique: true,
  },
  password: { type: String },
  username: { type: String },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = model("user", userSchema);
