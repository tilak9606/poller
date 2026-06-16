export default class ApiError extends Error {
    public readonly statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: "Bad Request" | string = "Bad Request") {
        return new ApiError(400, message);
    }

    static unauthorized(message: "Unauthorized" | string = "Unauthorized") {
        return new ApiError(401, message);
    }

    static forbidden(message: "Forbidden" | string = "Forbidden") {
        return new ApiError(403, message);
    }

    static notFound(message: "Not Found" | string = "Not Found") {
        return new ApiError(404, message);
    }

    static internal(message: "Internal Server Error" | string = "Internal Server Error") {
        return new ApiError(500, message);
    }

    static conflict(message: "Conflict" | string = "Conflict") {
        return new ApiError(409, message);
    }

}