import express from "express";
import contractRoutes from "./contract";
import jobRoutes from "./job";
import profileRoutes from "./profile";
import adminRoutes from "./admin";

const router = express.Router();

router.get("/api/v1", ({ res }) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to Contract Api v1.0.0",
  });
});

router.use(contractRoutes);
router.use(jobRoutes);
router.use(profileRoutes);
router.use(adminRoutes);

export default router;
