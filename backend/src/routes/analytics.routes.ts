import { Router } from "express";
import { getTotalVested } from "../controllers/analytics.controller";

const router = Router();

router.get("/total-vested", getTotalVested);

export default router;