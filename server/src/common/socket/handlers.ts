import { Server } from "socket.io";

export default function registerHandlers(io: Server) {
  io.on("connection", (socket) => {
    console.log(`New Client connected: ${socket.id}`);

    socket.on("poll:join", (pollId: string) => {
      socket.join(`poll:${pollId}`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}
