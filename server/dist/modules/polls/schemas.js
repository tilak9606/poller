import { z } from "zod";
import { mongoIdSchema } from "../../common/schema/mongoId.js";
const optionSchema = z.string({
    error: (issue) => issue.input === undefined ? "Option text is required" : "Option text must be a string",
}).trim().min(1, "Option text cannot be empty");
const questionSchema = z.strictObject({
    text: z.string({
        error: (issue) => issue.input === undefined ? "Question text is required" : "Question text must be a string",
    }).trim().min(1, "Question text cannot be empty"),
    options: z.array(optionSchema, {
        error: (issue) => issue.input === undefined ? "Options are required" : "Options must be an array of strings",
    }).min(2, "A question must have at least 2 options"),
    isRequired: z.boolean({
        error: (issue) => issue.input === undefined ? "isRequired is required" : "isRequired must be a boolean",
    }).optional().default(true),
}, {
    error: (issue) => {
        issue.input === undefined ? "Question is required" : "Question must be an object";
    },
});
export const createPollSchema = z.object({
    body: z.strictObject({
        title: z
            .string({
            error: (issue) => issue.input === undefined
                ? "Title is required"
                : "Title must be a string",
        })
            .trim()
            .min(1, "Title is required"),
        description: z
            .string({
            error: (issue) => issue.input === undefined
                ? "Description is required"
                : "Description must be a string",
        })
            .trim()
            .min(1, "Description is required")
            .optional()
            .default(""),
        responseAccess: z
            .enum(["anonymous", "authenticated"], {
            error: (issue) => issue.input === undefined
                ? `Response Access is required`
                : `Response Access must be either "anonymous" or "authenticated"`,
        })
            .optional()
            .default("anonymous"),
        expiresAt: z.coerce
            .date({
            error: (issue) => issue.input === undefined
                ? "Expiry date is required"
                : "Expiry date must be a valid date",
        })
            .refine((date) => date > new Date(), {
            message: "Expiry date must be in the future",
        }),
        questions: z
            .array(questionSchema, {
            error: (issue) => issue.input === undefined
                ? "Questions are required"
                : "Questions must be an array",
        })
            .min(1, "Poll must have at least one question")
            .refine((questions) => questions.some((q) => q.isRequired), {
            message: "At least one question must be required",
        }),
    }, {
        error: (issue) => issue.input === undefined
            ? "Body is required"
            : "Body must be an object",
    }),
});
export const pollIdParamSchema = z.object({
    params: z.object({
        pollId: mongoIdSchema,
    }),
});
//# sourceMappingURL=schemas.js.map