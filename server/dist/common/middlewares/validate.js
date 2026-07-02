import { z } from "zod";
import ApiError from "../utils/ApiError.js";
export default function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        if (!result.success) {
            const errorMessages = result.error.issues
                .map((issue) => issue.message)
                .join(", ");
            throw ApiError.badRequest(`Validation failed: ${errorMessages}`);
        }
        req.validated = result.data;
        next();
    };
}
//# sourceMappingURL=validate.js.map