import { Router } from "express";
import { ProblemController } from "../controller/ProblemController";

const problemRouter = Router();

const { createProblem, getAllProblems, getTodayProblemsForUser } = new ProblemController();

problemRouter.post("/", createProblem);
problemRouter.get("/", getAllProblems);
problemRouter.get("/todaysProblems/:username", getTodayProblemsForUser);

export default problemRouter;