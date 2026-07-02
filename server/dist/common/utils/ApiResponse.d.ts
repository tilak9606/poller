import type { Response } from "express";
export default class ApiResponse {
    static success<T>(res: Response, message?: string, data?: T): Response<any, Record<string, any>>;
    static created<T>(res: Response, message?: string, data?: T): Response<any, Record<string, any>>;
    static noContent(res: Response): Response<any, Record<string, any>>;
}
//# sourceMappingURL=ApiResponse.d.ts.map