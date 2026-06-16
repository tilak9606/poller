import User from "./model.js";
import { getAuth } from "@clerk/express";
import ApiError from "../../common/utils/ApiError.js";
import ApiResponse from "../../common/utils/ApiResponse.js";
import type { Request, Response, NextFunction } from "express";

export async function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { userId } = getAuth(req);
  if (!userId) {
    throw ApiError.unauthorized();
  }
  let user = await User.findOne({ clerkUserId: userId });
  if (!user) {
    user = await User.create({ clerkUserId: userId });
  }
  return ApiResponse.success(res, "User retrieved successfully", { user });
}
