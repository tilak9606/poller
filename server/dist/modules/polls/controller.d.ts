import type { Request, Response, NextFunction } from "express";
export declare function handleGetAllPolls(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function handleGetPoll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function handleCreatePoll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function handlePublishPoll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=controller.d.ts.map