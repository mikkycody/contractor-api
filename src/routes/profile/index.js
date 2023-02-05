import express from "express";
import { deposit } from "../../controllers/profile/profileController";
import getProfile from "../../middlewares/getProfile";

const router = express.Router();
router.post("/api/v1/balances/deposit", getProfile, deposit);

export default router;
