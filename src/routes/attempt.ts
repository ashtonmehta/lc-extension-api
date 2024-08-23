import { Router } from "express";
import { AttemptController } from "../controller/AttemptController";
import { param, body } from "express-validator";
import { validate } from "../middleware";

const attemptRouter = Router();

const { createAttempt, getAllAttempts, getAttemptsByUsername } =
  new AttemptController();

attemptRouter.post(
  "/",
  body("username")
    .isString()
    .withMessage("username must be a string")
    .isLength({ min: 1 })
    .withMessage("username must be at least 1 character"),
  body("problemName")
    .isString()
    .withMessage("problemName must be a string")
    .isLength({ min: 1 })
    .withMessage("problemName must be at least 1 character"),
  body("status").isString().withMessage("status must be a string"),
  body("date").isISO8601().withMessage("date must be valid"),
  validate,
  createAttempt
);
attemptRouter.get("/", getAllAttempts);
attemptRouter.get(
  "/:username",
  param("username")
    .isString()
    .withMessage("username must be a string")
    .isLength({ min: 1 })
    .withMessage("username must be at least 1 character"),
  validate,
  getAttemptsByUsername
);

export default attemptRouter;
