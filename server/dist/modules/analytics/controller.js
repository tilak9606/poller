import User from "../auth/model.js";
import Poll from "../polls/model.js";
import { computeAnalytics } from "./service.js";
import { getAuth } from "@clerk/express";
import ApiResponse from "../../common/utils/ApiResponse.js";
import ApiError from "../../common/utils/ApiError.js";
export async function handleGetAnalytics(req, res, next) {
    const { pollId } = req.validated.params;
    const poll = await Poll.findById(pollId).lean();
    if (!poll) {
        throw ApiError.notFound("Poll not found");
    }
    const { userId } = getAuth(req);
    let isOwner = false;
    if (userId) {
        const user = await User.findOne({
            clerkUserId: userId,
        });
        if (user) {
            isOwner = poll.creator.toString() === user._id.toString();
        }
    }
    if (!isOwner && !poll.publishedAt) {
        throw ApiError.forbidden("Results are not published yet");
    }
    const analytics = await computeAnalytics(poll._id);
    return ApiResponse.success(res, "Analytics fetched successfully", {
        poll,
        ...analytics,
        insights: {
            status: poll.publishedAt
                ? "published"
                : poll.expiresAt < new Date()
                    ? "expired"
                    : "active",
            ...analytics.insights,
        },
    });
}
//# sourceMappingURL=controller.js.map