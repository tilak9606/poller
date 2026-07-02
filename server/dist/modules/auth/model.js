import { Schema, model } from "mongoose";
const userSchema = new Schema({
    clerkUserId: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });
const User = model("User", userSchema);
export default User;
//# sourceMappingURL=model.js.map