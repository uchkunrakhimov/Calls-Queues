import express from "express";
import socketIO from "socket.io";
import http from "http";
import path from "path";
import cors from "cors";

// Import route handlers
import {
  allQueueData,
  actions,
  login,
  getUser,
  getNumbers,
} from "./routes";

// Initialize Express app
const app = express();

// Configure middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from dist directory
const publicPath = path.join(__dirname, "../public/");
app.use(express.static(publicPath));

// Handle root route
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: publicPath });
});

// Define API routes
app.use("/api/auth/login", login);

app.use("/api/actions", actions);
app.use("/api/data", allQueueData);
app.use("/api/lookupUser", getUser);
app.use("/api/lookupNumbers", getNumbers);

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.clear();
  console.log(`Server listening on: http://127.0.0.1:${PORT}`);
});

// Initialize Socket.IO server with CORS configuration
export const io = new socketIO.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
