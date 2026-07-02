import ApiError from "../utils/ApiError.js";
export default function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}
//# sourceMappingURL=errorHandler.js.map