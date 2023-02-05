import express from "express";
import { createJob } from "../../controllers/job/jobController";
import getProfile from "../../middlewares/getProfile";

const router = express.Router();
router.post("/api/v1/jobs", getProfile, createJob);

export default router;
