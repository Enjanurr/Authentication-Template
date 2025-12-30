import { Types } from "mongoose";

export interface NoteTypes {
  content: string;
  user: Types.ObjectId;
  createdAt?: Date;
}