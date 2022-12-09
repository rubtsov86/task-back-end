import { User } from "../../models/user";
import { IRequestAfterAuth } from "../../interfaces/IRequestAfterAuth";
import { RequestHandler } from "express";

const logout: RequestHandler = async (
  req: IRequestAfterAuth,
  res
): Promise<void> => {
  const _id = req.user?._id;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

export default logout;
