import { User } from "../models/user";
import { IRequestAfterAuth } from "../interfaces/IRequestAfterAuth";
import { Unauthorized } from "http-errors";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import RequestError from "../helpers/RequestError";

import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

interface TokenInterface {
  id: number;
}

const auth: RequestHandler = async (
  req: IRequestAfterAuth,
  res,
  next
): Promise<void> => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }

    const { id } = jwt.verify(token, SECRET_KEY) as TokenInterface;

    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "invalid signature") {
        RequestError(401, "Not authorized");
      }
    }

    next(error);
  }
};

export default auth;
