import { Router } from "express";
import { getUser } from "../controllers";
const router = Router();

router.post("/", getUser);

export { router as getUser };
