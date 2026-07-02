import ApiError from "../utils/ApiError.js";
export default function notFoundHandler(req, res, next) {
    throw ApiError.notFound(`The requested resource was not found ${req.method} ${req.originalUrl}`);
}
//# sourceMappingURL=notFoundHandler.js.map