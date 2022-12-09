import { User } from "../../models/user";
import { IUserRequest } from "../../interfaces/IUser";
import { RequestHandler } from "express";

import { Conflict } from "http-errors";
import bcrypt from "bcryptjs";

const signup: RequestHandler = async (req, res): Promise<void> => {
  const { name, email, password } = req.body as IUserRequest;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`user witn email ${email} already exist`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    name,
    email,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      name,
      email,
      role: "USER",
    },
  });
};

export default signup;
