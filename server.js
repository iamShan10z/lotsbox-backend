/* ======================
   SOCKET.IO CHAT
====================== */

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  /* typing indicator */
  socket.on("typing", (user) => {
    socket.broadcast.emit("typing", user);
  });

  socket.on("stop-typing", () => {
    socket.broadcast.emit("stop-typing");
  });

  /* message broadcast */
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