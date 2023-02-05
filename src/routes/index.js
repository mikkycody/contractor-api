import express from "express";
import contractRoutes from "./contract";

const router = express.Router();

router.get("/api/v1", ({ res }) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to Contract Api v1.0.0",
  });
});

router.use(contractRoutes);

export default router;