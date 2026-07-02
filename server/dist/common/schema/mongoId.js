import { z } from "zod";
import { Types } from "mongoose";
export const mongoIdSchema = z.string({ error: "Invalid ID" }).refine((id) => Types.ObjectId.isValid(id), {
    message: "Invalid MongoDB ObjectId",
});
//# sourceMappingURL=mongoId.js.map