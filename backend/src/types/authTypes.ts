import { Request } from "express";
import { Types } from "mongoose";

export interface AuthUser {
  _id: Types.ObjectId;
  userName?: string;
  userEmail?: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
