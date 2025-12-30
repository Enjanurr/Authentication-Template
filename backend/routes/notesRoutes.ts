import express from "express";
import { addNotes,getNotes } from "../controllers/notesController";
import { protectRoute } from "../middleware/authMiddleware";
const router = express.Router()

router.post('/addNotes',protectRoute,addNotes);
router.get('/getNotes',protectRoute,getNotes);

export default router;