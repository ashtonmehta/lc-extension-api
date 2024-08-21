require("dotenv").config();

const port = process.env.PORT || 3000;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

export {
  port,
  db_username,
  db_password,
};
