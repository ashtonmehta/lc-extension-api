import { Attempt, AttemptStatus } from "../entity/Attempt";
import { Problem } from "../entity/Problem";
import { User } from "../entity/User";

class AttemptService {
  async createAttempt(
    user: User,
    problem: Problem,
    status: AttemptStatus,
    date: Date
  ): Promise<Attempt> {
    const attempt = new Attempt();
    attempt.user = user;
    attempt.problem = problem;
    attempt.status = status;
    attempt.date = date;
    await attempt.save();
    return attempt;
  }

}

const attemptService = new AttemptService();
export { attemptService as AttemptService };
