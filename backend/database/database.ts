import mongoose, { Schema, model } from "mongoose";
import { UserDocument } from "../src/types/userTypes";
import { NoteTypes} from "../src/types/noteTypes";
import dotenv from "dotenv";

dotenv.config()

const connection_string_atlas = process.env.DATABASE_URI_ATLAS || "Failed to connect";


const userSchema = new Schema<UserDocument>({
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  userEmail: {
    type: String,
    required: [true, "Email is required"],
  },
  userPassword: {
    type: String,
    required: [true, "Password is required"],
  },
});

const noteSchema = new Schema<NoteTypes>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<UserDocument>("User", userSchema);
export const Notes = model<NoteTypes>("Notes", noteSchema);


export const connectDB = async () => {
  try {
       await mongoose.connect(connection_string_atlas);
     
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
};
