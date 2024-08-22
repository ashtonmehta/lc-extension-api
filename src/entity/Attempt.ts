import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { User } from "./User"
import { Problem } from "./Problem"

export enum AttemptStatus {
    NOT_ATTEMPTED = 'NOT_ATTEMPTED',
    NEEDED_SOLUTION = 'NEEDED_SOLUTION',
    NEEDED_HINT = 'NEEDED_HINT',
    MASTERED = 'MASTERED',
}

@Entity()
export class Attempt extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: AttemptStatus,
        default: AttemptStatus.NOT_ATTEMPTED
    })
    status: AttemptStatus;

    @Column({ type: 'date'})
    date: Date;

    @ManyToOne(() => User, user => user.attempts)
    user: User;

    @ManyToOne(() => Problem, problem => problem.attempts)
    problem: Problem;
}

