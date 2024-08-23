import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((error) => error.msg);
    const combinedMessage = messages.join(", ");
    return res.status(400).json({ message: combinedMessage });
  }
  next();
};

export function handleError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.status || 500).send({ message: err.message });
}

export function handleNotFound(req: Request, res: Response) {
  res.status(404).send({ message: "Not Found" });
}
