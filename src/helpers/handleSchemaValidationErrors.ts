import { Request, NextFunction } from "express";

type ErrorParams = {
  name: string;
  code: number;
  status: number;
};

const isConflict = ({ name, code }: ErrorParams): boolean =>
  name === "MongoServerError" && code === 11000;

const handleSchemaValidationErrors = (
  error: ErrorParams,
  data: Request,
  next: NextFunction
): void => {
  error.status = isConflict(error) ? 409 : 400;
  next();
};

export default handleSchemaValidationErrors;
