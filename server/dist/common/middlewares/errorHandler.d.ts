import type { NextFunction, Request, Response } from "express";
export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
//# sourceMappingURL=errorHandler.d.ts.map