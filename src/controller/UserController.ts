import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils";
import { User } from "../entity/User";

export class UserController {

    createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.body;
        const user = new User();
        user.username = username;
        await user.save();
        return res.status(201).json(user);
    })

    getAllUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const users = await User.find();
        return res.status(200).json(users);
    });

    getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id,
            },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    })
}
