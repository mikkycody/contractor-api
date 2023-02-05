import express from "express";
import { createContract, getContract } from "../../controllers/contract/contractController";
import getProfile from "../../middlewares/getProfile";

const router = express.Router();
router.post("/api/v1/contracts", getProfile, createContract);
router.get("/api/v1/contracts/:id", getProfile, getContract);

export default router;
