import { RequestHandler } from "express";

import { Task } from "../../models/task";
import { IRequestAfterAuth } from "../../interfaces/IRequestAfterAuth";

const getTask: RequestHandler = async (
  req: IRequestAfterAuth,
  res,
  next
): Promise<void> => {
  const _id = req.user?._id;
  const taskList = await Task.find({ owner: _id }).populate(
    "owner",
    "_id email"
  );

  res.status(200).json(taskList);
};

export default getTask;
