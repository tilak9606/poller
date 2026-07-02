import { Server as SocketServer } from "socket.io";
import {} from "node:http";
import env from "../config/env.js";
import registerHandlers from "./handlers.js";
let io = null;
export default function createSocketServer(server) {
    io = new SocketServer(server, {
        cors: {
            origin: env.CLIENT_URL,
            methods: ["GET", "POST"],
        },
    });
    registerHandlers(io);
    return io;
}
export function getSocketServer() {
    if (!io) {
        throw new Error("Socket server not initialized");
    }
    return io;
}
//# sourceMappingURL=index.js.map