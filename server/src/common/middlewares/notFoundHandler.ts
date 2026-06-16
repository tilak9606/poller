import ApiError from "../utils/ApiError.js";
import type { NextFunction, Request, Response } from "express";

export default function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  throw ApiError.notFound(
    `The requested resource was not found ${req.method} ${req.originalUrl}`,
  );
}
