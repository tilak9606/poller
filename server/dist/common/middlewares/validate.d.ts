import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
type ValidationSchema = z.ZodObject<{
    body?: z.ZodType;
    query?: z.ZodType;
    params?: z.ZodType;
}>;
export default function validate(schema: ValidationSchema): (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validate.d.ts.map