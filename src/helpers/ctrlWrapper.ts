import { RequestHandler } from "express";

const ctrlWrapper = (ctrl: RequestHandler): RequestHandler => {
  const func: RequestHandler = async (req, res, next): Promise<void> => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

export default ctrlWrapper;
