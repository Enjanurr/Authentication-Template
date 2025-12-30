import jwt from "jsonwebtoken";
import { Request, Response} from "express";
import { User } from "../database/database";

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!
    ) as { _id: string };

    // Optional: check if user still exists
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const newAccessToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      accessToken: newAccessToken
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
