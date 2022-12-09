import { Router } from "express";

import addTask from "../controllers/tasks/addTask";
import getTask from "../controllers/tasks/getTask";
import getTaskById from "../controllers/tasks/getTaskById";
import updateStatusById from "../controllers/tasks/updateStatusById";
import ctrlWrapper from "../helpers/ctrlWrapper";
import validationBody from "../middlewares/validationBody";
import { addSchema, updateStatusSchema } from "../models/task";
import auth from "../middlewares/auth";

const router = Router();

router.post("/", auth, validationBody(addSchema), ctrlWrapper(addTask));

router.get("/", auth, getTask);

router.get("/:taskId", auth, getTaskById);

router.patch(
  "/:taskId",
  auth,
  validationBody(updateStatusSchema),
  updateStatusById
);

export default router;
