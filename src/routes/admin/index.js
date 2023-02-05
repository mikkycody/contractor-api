import express from "express";
import { getBestProfession, getBestClients } from "../../controllers/admin/adminController";
import isAdmin from "../../middlewares/isAdmin";

const router = express.Router();
router.get("/api/v1/admin/best-profession", isAdmin, getBestProfession);
router.get("/api/v1/admin/best-clients", isAdmin, getBestClients);

export default router;
