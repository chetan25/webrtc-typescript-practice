import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import http, { Server } from "http";
import cors from "cors";
import mongoose from "mongoose";

import authRoute from "./routes/auth";
import friendInvitationRoute from "./routes/friendInvitationRoute";
import registerSocketServer from "./socket-server";

const PORT: string = process.env.PORT || process.env.API_PORT || "5000";
const MONGO_URI: string = process.env.MONGO_URI!;

const app: Express = express();

app.use(express.json());
app.use(cors());

// add routes
app.use("/api/auth", authRoute);
app.use("/api/friend-invitation", friendInvitationRoute);

const server: Server = http.createServer(app);
registerSocketServer(server);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongoose connected successfully");
    server.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error("DB connection failed, server not started", err);
  });
