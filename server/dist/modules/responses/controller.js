import User from "../auth/model.js";
import Poll from "../polls/model.js";
import Response from "./model.js";
import { getAuth } from "@clerk/express";
import { validatePollAnswers } from "./service.js";
import { computeAnalytics } from "../analytics/service.js";
import { emitAnalyticsUpdate } from "../../common/socket/emitter.js";
import { generateAnonymousToken, hashAnnonymousToken } from "./utils.js";
import ApiResponse from "../../common/utils/ApiResponse.js";
import ApiError from "../../common/utils/ApiError.js";
import env from "../../common/config/env.js";
export async function handlePostResponse(req, res, next) {
    const { pollId } = req.validated.params;
    const { answers } = req.validated.body;
    const poll = await Poll.findById(pollId);
    if (!poll) {
        throw ApiError.notFound("Poll not found");
    }
    if (poll.publishedAt) {
        throw ApiError.badRequest("Poll is already published");
    }
    if (poll.expiresAt < new Date()) {
        throw ApiError.badRequest("Poll has expired");
    }
    await validatePollAnswers(pollId, answers);
    const { userId } = getAuth(req);
    let user = null;
    if (userId) {
        user = await User.findOne({ clerkUserId: userId });
    }
    if (poll.responseAccess === "authenticated" && !user) {
        throw ApiError.unauthorized("You must be signed in to participate in this poll");
    }
    let anonymousTokenHash = null;
    if (poll.responseAccess === "anonymous") {
        const cookieName = `poll_${pollId}_token`;
        let anonymousToken = req.cookies[cookieName];
        if (!anonymousToken) {
            anonymousToken = generateAnonymousToken();
            res.cookie(cookieName, anonymousToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000, //30d
            });
        }
        anonymousTokenHash = hashAnnonymousToken(anonymousToken);
    }
    const duplicateConditions = [];
    if (user) {
        duplicateConditions.push({ respondent: user._id });
    }
    if (anonymousTokenHash) {
        duplicateConditions.push({ anonymousTokenHash });
    }
    if (duplicateConditions.length === 0) {
        throw ApiError.unauthorized("No valid authentication method found");
    }
    const existingResponse = await Response.findOne({
        poll: pollId,
        $or: duplicateConditions,
    });
    if (existingResponse) {
        if (user && existingResponse.respondent) {
            existingResponse.respondent = user._id;
            await existingResponse.save();
        }
        throw ApiError.conflict("You have already submitted a response to this poll");
    }
    const createdResponse = await Response.create({
        poll: pollId,
        respondent: user ? user._id : null,
        anonymousTokenHash,
        answers,
    });
    ApiResponse.success(res, "Response recorded successfully", {
        response: createdResponse,
    });
    const analytics = await computeAnalytics(poll._id);
    emitAnalyticsUpdate(poll._id.toString(), {
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
    return;
}
//# sourceMappingURL=controller.js.map