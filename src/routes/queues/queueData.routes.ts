import { Router } from "express";
import { allQueueData } from "../../controllers";

const router = Router();

router.get("/", allQueueData);

export { router as allQueueData };
