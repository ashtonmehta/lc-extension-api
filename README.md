# LC Chrome Extension API
Tech Stack: Node.js, Express, TypeORM, PostgreSQL

Requirements:
1. Node.js
2. Docker

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Set up .env file with the variables contained in `config.ts`.
4. `docker compose up -d` to start the database
5. Run `npm run dev` command
6. `docker compose down` to stop the database (when you're done)