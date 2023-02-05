import express from "express";
import { createJob, unpaidJobs, pay } from "../../controllers/job/jobController";
import getProfile from "../../middlewares/getProfile";

const router = express.Router();
router.post("/api/v1/jobs", getProfile, createJob);
router.get("/api/v1/jobs/unpaid", getProfile, unpaidJobs);
router.post("/api/v1/jobs/:jobId/pay", getProfile, pay);

export default router;
