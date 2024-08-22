import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils";
import { ProblemService } from "../service/ProblemService";
import { User } from "../entity/User";
import { Problem } from "../entity/Problem";


export class ProblemController {

    getAllProblems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const problems = await Problem.find();
        return res.status(200).json(problems);
    });

    createProblem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body;

        const newProblem = await ProblemService.createProblem(name);

        if (!newProblem) {
            return res.status(400).json({ message: 'Problem already exists' });
        }

        return res.status(201).json(newProblem);
    });

    getTodayProblemsForUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.params;

        const user = await User.findOne({
            where: {
                username,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const todayProblems = await ProblemService.getTodayProblemsForUser(user);

        return res.status(200).json(todayProblems);
    });
}