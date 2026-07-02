export default class ApiError extends Error {
    readonly statusCode: number;
    constructor(statusCode: number, message: string);
    static badRequest(message?: "Bad Request" | string): ApiError;
    static unauthorized(message?: "Unauthorized" | string): ApiError;
    static forbidden(message?: "Forbidden" | string): ApiError;
    static notFound(message?: "Not Found" | string): ApiError;
    static internal(message?: "Internal Server Error" | string): ApiError;
    static conflict(message?: "Conflict" | string): ApiError;
}
//# sourceMappingURL=ApiError.d.ts.map