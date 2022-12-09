import { RequestHandler, Response } from "express";

import { Task } from "../../models/task";
import { IRequestAfterAuth } from "../../interfaces/IRequestAfterAuth";

const getTaskById: RequestHandler<{ taskId: string }> = async (
  req: IRequestAfterAuth,
  res,
  next
): Promise<void | Response> => {
  const ownerId = req.user?._id;
  const taskId = req.params.taskId;

  const contactToFind = await Task.findOne({
    owner: ownerId,
    _id: taskId,
  });

  if (!contactToFind) {
    return res.status(404).json({
      message: `Ups, we don't find contact with id ${req.params.contactId}, try something else`,
    });
  }

  res.status(200).json(contactToFind);
};

export default getTaskById;
