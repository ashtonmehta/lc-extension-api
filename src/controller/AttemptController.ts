import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils";
import { Attempt } from "../entity/Attempt";
import { User } from "../entity/User";
import { Problem } from "../entity/Problem";
import { ProblemService } from "../service/ProblemService";
import { AttemptService } from "../service/AttemptService";

export class AttemptController {
    createAttempt = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { username, problemName, status, date } = req.body;

        const user = await User.findOne({
            where: {
                username,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let problem = await Problem.findOne({
            where: {
                name: problemName,
            },
        });

        if (!problem) {
            problem = await ProblemService.createProblem(problemName);
        }

        const newDate = new Date(date);
        
        const newAttempt = await AttemptService.createAttempt(user, problem, status, newDate);
        
        return res.status(201).json(newAttempt);
    });

    getAllAttempts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const attempts = await Attempt.find();
        return res.status(200).json(attempts);
    });

    getAttemptsByUsername = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.params;
        const user = await User.findOne({
            where: {
                username,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const attempts = await Attempt.find({
            where: {
                user,
            },
            relations: ['user', 'problem'],
        });

        return res.status(200).json(attempts);
    });
}