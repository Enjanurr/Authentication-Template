import express from "express";
import authRoutes from "./authRoutes"
import notesRoutes from './notesRoutes'
const router = express.Router();

router.use('/notesRoutes',notesRoutes);
router.use("/auth", authRoutes)

export default router;