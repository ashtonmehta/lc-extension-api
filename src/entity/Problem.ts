import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Attempt } from "./Attempt";

@Entity()
export class Problem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "varchar", length: 2048 })
  link: string;

  @OneToMany(() => Attempt, (attempt) => attempt.problem)
  attempts: Attempt[];
}
