import { Router } from "express";
import { UserController } from "../controller/UserController";
import { param, body } from "express-validator";
import { validate } from "../middleware";

const userRouter = Router();

const { createUser, getAllUsers, getUserById } = new UserController();

userRouter.get("/", getAllUsers);
userRouter.get(
  "/:id",
  param("id").isInt({ min: 0 }).withMessage("id must be a positive integer"),
  validate,
  getUserById
);
userRouter.post(
  "/",
  body("username")
    .isString()
    .withMessage("username must be a string")
    .isLength({ min: 1 })
    .withMessage("username must be a positive length"),
  validate,
  createUser
);

export default userRouter;
