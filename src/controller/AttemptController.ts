import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils";
import { ProblemService } from "../service/ProblemService";
import { AttemptService } from "../service/AttemptService";
import { UserService } from "../service/UserService";

export class AttemptController {
    private attemptService = new AttemptService();
    private userService = new UserService();
    private problemService = new ProblemService();

    createAttempt = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { username, problemName, status, date } = req.body;

        if (!username || !problemName || !status || !date) {
            return res.status(400).json({ message: 'username, problemName, status, date are required' });
        }

        if (status !== 'MASTERED' && status !== 'NEEDED_HINT' && status !== 'NEEDED_SOLUTION') {
            return res.status(400).json({ message: 'status must be MASTERED, NEEDED_HINT, or NEEDED_SOLUTION' });
        }

        const user = await this.userService.getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: `User with username ${username} not found` });
        }

        let problem = await this.problemService.getProblemByName(problemName);

        if (!problem) {
            problem = await this.problemService.createProblem(problemName);
        }

        const newDate = new Date(date);
        
        const newAttempt = await this.attemptService.createAttempt(user, problem, status, newDate);
        
        return res.status(201).json(newAttempt);
    });

    getAllAttempts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const attempts = await this.attemptService.getAllAttempts();
        return res.status(200).json(attempts);
    });

    getAttemptsByUsername = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ message: 'username is required' });
        }

        const user = await this.userService.getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: `User with username ${username} not found` });
        }

        const attempts = await this.attemptService.getAttemptsByUsername(user);

        return res.status(200).json(attempts);
    });
}