import { Schema, model } from "mongoose";
const pollSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    responseAccess: { type: String, enum: ["anonymous", "authenticated"], default: "anonymous" },
    expiresAt: { type: Date, required: true },
    publishedAt: { type: Date, default: null },
}, { timestamps: true });
pollSchema.index({ creator: 1, createdAt: -1 });
pollSchema.index({ expiresAt: 1 });
const Poll = model("Poll", pollSchema);
export default Poll;
//# sourceMappingURL=model.js.map