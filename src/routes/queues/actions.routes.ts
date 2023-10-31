import { Router } from "express";
import { actions } from "../../controllers";
const router = Router();

router.post("/", actions);

export { router as actions };
