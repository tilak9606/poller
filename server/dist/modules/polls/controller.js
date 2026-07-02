import Poll from "./model.js";
import Question from "../questions/model.js";
import User from "../auth/model.js";
import ApiError from "../../common/utils/ApiError.js";
import ApiResponse from "../../common/utils/ApiResponse.js";
import { getAuth } from "@clerk/express";
import { emitPollPublished } from "../../common/socket/emitter.js";
export async function handleGetAllPolls(req, res, next) {
    const polls = await Poll.find({ creator: req.user._id })
        .sort({
        createdAt: -1,
    })
        .lean();
    return ApiResponse.success(res, "Polls fetched successfully", {
        polls,
    });
}
export async function handleGetPoll(req, res, next) {
    const { pollId } = req.validated.params;
    const poll = await Poll.findById(pollId).lean();
    if (!poll) {
        throw ApiError.notFound("Poll not found");
    }
    const { userId } = getAuth(req);
    let isOwner = false;
    let isAuthenticated = false;
    let requestingUser = null;
    if (userId) {
        requestingUser = await User.findOne({ clerkUserId: userId }).lean();
        if (requestingUser) {
            isAuthenticated = true;
            if (requestingUser._id.toString() === poll.creator.toString()) {
                isOwner = true;
            }
        }
    }
    const isPublished = Boolean(poll.publishedAt);
    const isExpired = poll.expiresAt < new Date();
    const allowsAnonymous = poll.responseAccess === "anonymous";
    const allowsAuthenticated = poll.responseAccess === "authenticated";
    if (!isOwner &&
        !isPublished &&
        !allowsAnonymous &&
        !(allowsAuthenticated && isAuthenticated)) {
        throw ApiError.forbidden("Poll is not public");
    }
    const questions = await Question.find({ poll: pollId })
        .sort({ order: 1 })
        .lean();
    return ApiResponse.success(res, "Poll fetched successfully", {
        poll,
        questions,
        meta: {
            isOwner,
            canRespond: !isExpired && !isPublished,
        },
    });
}
export async function handleCreatePoll(req, res, next) {
    const { title, description, responseAccess, expiresAt, questions } = req.validated.body;
    const createdPoll = new Poll({
        creator: req.user._id,
        title,
        description,
        responseAccess,
        expiresAt,
    });
    await createdPoll.save();
    const createdQuestions = await Question.insertMany(questions.map((question, index) => ({
        poll: createdPoll._id,
        text: question.text,
        isRequired: question.isRequired,
        order: index,
        options: question.options.map((option) => ({ text: option })),
    })));
    return ApiResponse.success(res, "Poll created successfully", {
        poll: createdPoll,
        questions: createdQuestions,
    });
}
export async function handlePublishPoll(req, res, next) {
    const { pollId } = req.validated.params;
    const poll = await Poll.findById(pollId);
    if (!poll) {
        throw ApiError.notFound("Poll not found");
    }
    if (!poll.creator.equals(req.user._id)) {
        throw ApiError.forbidden("You are not allowed to publish this poll");
    }
    if (poll.publishedAt) {
        throw ApiError.badRequest("Poll has already been published");
    }
    poll.publishedAt = new Date();
    await poll.save();
    emitPollPublished(poll._id.toString(), poll.publishedAt);
    return ApiResponse.success(res, "Poll published successfully", {
        poll,
    });
}
//# sourceMappingURL=controller.js.map