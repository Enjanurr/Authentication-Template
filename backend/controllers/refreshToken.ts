import jwt from "jsonwebtoken";
import { Request, Response} from "express";
import { User } from "../database/database";

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
      _id: string;
    };

    const newAccessToken = jwt.sign(
      { _id: decoded._id },
      process.env.JWT_SECRET!,
      { expiresIn: "5s" }
    );

    return res.json({ accessToken: newAccessToken });
  } catch {
    // 🔥 IMPORTANT PART
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
