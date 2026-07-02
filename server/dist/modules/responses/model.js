import { Schema, model } from "mongoose";
const answerSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    selectedOption: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { _id: false });
const responseSchema = new Schema({
    poll: {
        type: Schema.Types.ObjectId,
        ref: "Poll",
        required: true,
    },
    respondent: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    anonymousTokenHash: {
        type: String,
        default: null,
    },
    answers: {
        type: [answerSchema],
        required: true,
        validate: {
            validator: (answers) => answers.length > 0,
            message: "Response must contain at least one answer",
        },
    },
}, { timestamps: true });
responseSchema.index({ poll: 1, createdAt: -1 });
responseSchema.index({ respondent: 1, poll: 1 }, { unique: true, partialFilterExpression: { respondent: { $ne: null } } });
responseSchema.index({ anonymousTokenHash: 1, poll: 1 }, {
    unique: true,
    partialFilterExpression: { anonymousTokenHash: { $type: "string" } },
});
const Response = model("Response", responseSchema);
export default Response;
//# sourceMappingURL=model.js.map