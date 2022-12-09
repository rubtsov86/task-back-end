import { User } from "../../models/user";
import { IUserRequest } from "../../interfaces/IUser";
import { Unauthorized } from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

const login: RequestHandler = async (req, res): Promise<void> => {
  const { email, password } = req.body as IUserRequest;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }

  const passwordCompare: boolean = bcrypt.compareSync(password, user.password);

  if (!passwordCompare) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      role: user.role,
    },
  });
};

export default login;
