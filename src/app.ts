import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import userRouter from "./routes/user";
import problemRouter from "./routes/problem";
import attemptRouter from "./routes/attempt";

function handleError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.status || 500).send({ message: err.message });
}

function handleNotFound(req: Request, res: Response) {
  res.status(404).send({ message: "Not Found" });
}

// create express app
const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>LC API is Running!</h1>");
});

// register all application routes
app.use("/users", userRouter);
app.use("/problems", problemRouter);
app.use("/attempts", attemptRouter);

// Error handling middleware
app.use(handleNotFound);
app.use(handleError);

export default app;
