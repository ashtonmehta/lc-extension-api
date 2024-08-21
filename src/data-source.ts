import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { db_username, db_password } from "./config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: db_username,
    password: db_password,
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
