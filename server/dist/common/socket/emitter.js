import { getSocketServer } from "./index.js";
export function emitAnalyticsUpdate(pollId, analyticsData) {
    try {
        const io = getSocketServer();
        io.to(`poll:${pollId}`).emit("poll:analytics:update", analyticsData);
    }
    catch (error) {
        console.error("Failed to emit analytics update:", error);
    }
}
export function emitPollPublished(pollId, publishedAt) {
    try {
        const io = getSocketServer();
        io.to(`poll:${pollId}`).emit("poll:publish", { pollId, publishedAt });
    }
    catch (error) {
        console.error("Failed to emit poll published event:", error);
    }
}
//# sourceMappingURL=emitter.js.map