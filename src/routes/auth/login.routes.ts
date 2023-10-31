import { Router } from "express";
import { loginUser } from "../../controllers";
import { authenticateUser } from "../../middleware";
const router = Router();

router.post("/", authenticateUser, loginUser);

export { router as login };
