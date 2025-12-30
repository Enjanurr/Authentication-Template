import { Response } from "express";
import { Notes } from "../database/database";
import { AuthRequest } from "../src/types/authTypes";

export const addNotes = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { content } = req.body;

    const note = await Notes.create({
      content,
      user: req.user._id,
    });

    return res.status(201).json(note);
  } catch (err) {
    return res.status(500).json({ message: "Failed to add note" });
  }
};

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notes = await Notes.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get notes" });
  }
};
