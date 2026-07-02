import { Server } from "socket.io";
export default function registerHandlers(io) {
    io.on("connection", (socket) => {
        console.log(`New Client connected: ${socket.id}`);
        socket.on("poll:join", (pollId) => {
            socket.join(`poll:${pollId}`);
        });
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}
//# sourceMappingURL=handlers.js.map