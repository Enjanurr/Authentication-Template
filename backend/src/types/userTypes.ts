import { Document } from "mongoose";

export interface UserDocument extends Document {
  userName: string;
  userEmail: string;
  userPassword: string;
}
