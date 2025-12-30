import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { User } from "../database/database";
import { AuthRequest } from "../src/types/authTypes";

export const protectRoute = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
    };

    const user = await User.findById(decoded._id).select(
      "_id userName userEmail"
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
