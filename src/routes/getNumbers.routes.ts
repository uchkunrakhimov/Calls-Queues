import { Router } from "express";
import { getNumbers } from "../controllers";
const router = Router();

router.post("/", getNumbers);

export { router as getNumbers };
