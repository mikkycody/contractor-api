import express from "express";
import contractRoutes from "./contract";
import jobRoutes from "./job";

const router = express.Router();

router.get("/api/v1", ({ res }) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to Contract Api v1.0.0",
  });
});

router.use(contractRoutes);
router.use(jobRoutes);

export default router;