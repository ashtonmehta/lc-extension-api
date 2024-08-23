import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils";
import { ProblemService } from "../service/ProblemService";
import { UserService } from "../service/UserService";

export class ProblemController {
    private problemService = new ProblemService();
    private userService = new UserService();

    getAllProblems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const problems = await this.problemService.getAllProblems();
        return res.status(200).json(problems);
    });

    createProblem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'name is required' });
        }

        const newProblem = await this.problemService.createProblem(name);

        if (!newProblem) {
            return res.status(400).json({ message: 'Problem already exists' });
        }

        return res.status(201).json(newProblem);
    });

    getTodayProblemsForUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ message: 'username is required' });
        }

        const user = await this.userService.getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: `User with username ${username} not found` });
        }

        const todayProblems = await this.problemService.getTodayProblemsForUser(user);

        return res.status(200).json(todayProblems);
    });
}