import { RequestHandler, Response } from "express";

import { Task } from "../../models/task";
import ITask from "../../interfaces/ITask";
import { IRequestAfterAuth } from "../../interfaces/IRequestAfterAuth";

const updateStatusById: RequestHandler<{ taskId: string }> = async (
  req: IRequestAfterAuth,
  res,
  next
): Promise<void | Response> => {
  if (!req.body) {
    return res.status(400).json({
      message: "missing field favorite",
    });
  }

  const newStatus = (req.body as ITask).status;

  const taskId = req.params.taskId;
  const ownerId = req.user?._id;

  const contactToUpdate = await Task.findOne({
    owner: ownerId,
    _id: taskId,
  });

  if (!contactToUpdate) {
    return res.status(404).json({
      message: `Ups, we don't find contact with id ${req.params.id}, try something else`,
    });
  }

  await Task.findByIdAndUpdate(taskId, { $set: { status: newStatus } });

  res.status(200).json({
    message: `Task with id ${req.params.id} changed status`,
  });
};

export default updateStatusById;
