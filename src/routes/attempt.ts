import { Router } from "express";
import { AttemptController } from "../controller/AttemptController";

const attemptRouter = Router();

const { createAttempt, getAllAttempts, getAttemptsByUsername } = new AttemptController();

attemptRouter.post("/", createAttempt);
attemptRouter.get("/", getAllAttempts);
attemptRouter.get("/:username", getAttemptsByUsername);

export default attemptRouter;