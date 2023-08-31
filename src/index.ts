import express, { json, urlencoded } from "express";
import socketIO from "socket.io";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";

import { ResGraph } from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/res", ResGraph);

const server = http.createServer(app);
const io = new socketIO.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export { io };

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
