import { Router } from "express";
import { ProblemController } from "../controller/ProblemController";
import { body, param } from "express-validator";
import { validate } from "../middleware";

const problemRouter = Router();

const { createProblem, getAllProblems, getTodayProblemsForUser } =
  new ProblemController();

problemRouter.post(
  "/",
  body("name")
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 1 })
    .withMessage("name should have a positive length"),
  validate,
  createProblem
);
problemRouter.get("/", getAllProblems);
problemRouter.get(
  "/todaysProblems/:username",
  param("username")
    .isString()
    .withMessage("username must be a string")
    .isLength({ min: 1 })
    .withMessage("username must be a positive length"),
  validate,
  getTodayProblemsForUser
);

export default problemRouter;
