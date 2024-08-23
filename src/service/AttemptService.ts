import { Attempt, AttemptStatus } from "../entity/Attempt";
import { Problem } from "../entity/Problem";
import { User } from "../entity/User";

export class AttemptService {
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

  async getAllAttempts(): Promise<Attempt[]> {
    const attempts = await Attempt.find({
      where: {},
      relations: ["user", "problem"],
    });
    return attempts;
  }

  async getAttemptsByUsername(user: User): Promise<Attempt[]> {
    const attempts = await Attempt.find({
      where: {
        user,
      },
      relations: ["user", "problem"],
    });
    return attempts;
  }
}
