import RequestError from "../helpers/RequestError";
import { RequestHandler } from "express";
import Joi from "joi";
import ITask from "../interfaces/ITask";

const validationBody = (schema: Joi.Schema<ITask>): RequestHandler => {
  const func: RequestHandler = async (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, error.message));
    }
    next();
  };

  return func;
};

export default validationBody;
