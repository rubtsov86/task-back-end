import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";

import tasksRoutes from "./routes/tasks";
import authRoutes from "./routes/auth";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRoutes);
app.use("/api/users", authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

type ErrorParams = {
  name: string;
  code: number;
  message: string;
  status: number;
};

app.use((err: ErrorParams, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
