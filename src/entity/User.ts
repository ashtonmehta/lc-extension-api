import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Attempt } from "./Attempt"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @OneToMany(() => Attempt, attempt => attempt.user)
    attempts: Attempt[];
}
