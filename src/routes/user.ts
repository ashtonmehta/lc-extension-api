import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRouter = Router();

const { createUser, getAllUsers, getUserById } = new UserController();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);

export default userRouter;