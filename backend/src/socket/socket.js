const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://ivan921345.github.io/chat-app/",
      "https://chat-app-six-psi-67.vercel.app",
    ],
  },
});

const userSocketMap = {};

const getReceiverSocketId = (userId) => {
  console.log(userSocketMap);

  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    if (userSocketMap[userId]) {
      delete userSocketMap[userId];
    }
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = {
  app,
  server,
  io,
  getReceiverSocketId,
};
