import { Router } from "express";
import { getVestingSchedule } from "../controllers/vesting.controller";

const router = Router();

router.get("/:walletAddress", getVestingSchedule);

export default router;