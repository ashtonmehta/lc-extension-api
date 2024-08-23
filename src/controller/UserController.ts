import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils";
import { UserService } from "../service/UserService";

export class UserController {
    private userService = new UserService();

    createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'username is required' });
        }

        const newUser = await this.userService.createUser(username);

        if (!newUser) {
            return res.status(400).json({ message: `User with username ${username} already exists` });
        }

        return res.status(201).json(newUser);
    })

    getAllUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.userService.getAllUsers();
        return res.status(200).json(users);
    });

    getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'id is required' });
        }

        const user = await this.userService.getUserById(id);

        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }

        return res.status(200).json(user);
    })
}
