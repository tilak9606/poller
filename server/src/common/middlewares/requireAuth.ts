import User from "../../modules/auth/model.js";
import { getAuth } from "@clerk/express";
import ApiError from "../utils/ApiError.js";

import type { NextFunction, Request, Response } from "express";

export default async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { userId } = getAuth(req);
  if (!userId) {
    throw ApiError.unauthorized("Authentication required");
  }
  const user = await User.findOne({ clerkUserId: userId });
  if (!user) {
    throw ApiError.unauthorized("User not found");
  }
  req.user = user;
  next();
}
