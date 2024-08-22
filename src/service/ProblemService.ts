import { Problem } from '../entity/Problem';
import { User } from '../entity/User';
import { AttemptStatus } from '../entity/Attempt';
import { Attempt } from '../entity/Attempt';
import { addDays, addMonths, addWeeks, isBefore } from 'date-fns';


class ProblemService {

    async createProblem(name: string) {
        const problemsWithSameName = await Problem.find({
            where: {
                name,
            },
        });

        if (problemsWithSameName.length > 0) {
            return null;
        }

        const problem = new Problem();
        problem.name = name;
        problem.link = `https://leetcode.com/problems/${name}`;
        await problem.save();

        return problem;
    }

    async getTodayProblemsForUser(user: User): Promise<Problem[]> {
        const attempts = await Attempt.find({
            where: {
                user,
            },
        });

        const dueProblems: Problem[] = [];

        const today = new Date();
        for (const attempt of attempts) {
            const lastAttemptedDate = attempt.date;

            switch (attempt.status) {
                case AttemptStatus.MASTERED:
                    if (isBefore(addMonths(lastAttemptedDate, 1), today)) {
                        dueProblems.push(attempt.problem);
                    }
                    break;
                case AttemptStatus.NEEDED_HINT:
                    if (isBefore(addWeeks(lastAttemptedDate, 1), today)) {
                        dueProblems.push(attempt.problem);
                    }
                    break;
                case AttemptStatus.NEEDED_SOLUTION:
                    if (isBefore(addDays(lastAttemptedDate, 3), today)) {
                        dueProblems.push(attempt.problem);
                    }
                    break;
                case AttemptStatus.NOT_ATTEMPTED:
                    break;
                default:
                    break;
            }
        }

        return dueProblems;
    }
}

const problemService = new ProblemService();
export { problemService as ProblemService };