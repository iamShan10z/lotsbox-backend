const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const http = require("http");
const { Server } = require("socket.io");

const app = express();               // ✅ MISSING LINE FIXED
app.use(cors());
app.use(express.json());

// serve uploaded images
app.use("/uploads", express.static("uploads"));

/* ======================
   SOCKET.IO CHAT
====================== */

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("typing", (user) => {
    socket.broadcast.emit("typing", user);
  });

  socket.on("stop-typing", () => {
    socket.broadcast.emit("stop-typing");
  });

  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

/* ======================
   START SERVER
====================== */

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("🚀 LotsBox backend running on port", PORT);
});
