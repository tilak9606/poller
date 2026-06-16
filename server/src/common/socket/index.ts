import {Server as SocketServer} from "socket.io";
import {type Server as httpServer} from "node:http";
import env from "../config/env.js";
import registerHandlers from "./handlers.js";

let io: SocketServer | null = null;

export default function createSocketServer(server: httpServer): SocketServer {
    io = new SocketServer(server, {
        cors: {
            origin: env.CLIENT_URL,
            methods: ["GET", "POST"],
        },
    });
    registerHandlers(io);
    return io;
}

export function getSocketServer(): SocketServer {
    if (!io) {
        throw new Error("Socket server not initialized");
    }
    return io;
}