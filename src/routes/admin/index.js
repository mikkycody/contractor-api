import express from "express";
import { getBestProfession } from "../../controllers/admin/adminController";
import isAdmin from "../../middlewares/isAdmin";

const router = express.Router();
router.get("/api/v1/admin/best-profession", isAdmin, getBestProfession);

export default router;
