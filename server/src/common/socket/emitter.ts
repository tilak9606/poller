import {getSocketServer} from "./index.js";

export function emitAnalyticsUpdate(pollId: string, analyticsData: unknown) {
    try {
        const io = getSocketServer();
        io.to(`poll:${pollId}`).emit("poll:analytics:update", analyticsData);
    }   
    catch (error) {
        console.error("Failed to emit analytics update:", error);
    }
}

export function emitPollPublished(pollId: string, publishedAt: Date) {
    try {
        const io = getSocketServer();
        io.to(`poll:${pollId}`).emit("poll:publish", { pollId, publishedAt });
    }
    catch (error) {
        console.error("Failed to emit poll published event:", error);
    }
}