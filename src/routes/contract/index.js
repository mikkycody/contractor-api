import express from "express";
import { createContract } from "../../controllers/contract/contractController";
import getProfile from "../../middlewares/getProfile";

const router = express.Router();
router.post("/api/v1/contracts", getProfile, createContract);

export default router;
