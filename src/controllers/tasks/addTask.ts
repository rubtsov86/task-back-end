import { RequestHandler } from "express";

import { Task } from "../../models/task";
import ITask from "../../interfaces/ITask";
import { IRequestAfterAuth } from "../../interfaces/IRequestAfterAuth";

const addTask: RequestHandler = async (
  req: IRequestAfterAuth,
  res,
  next
): Promise<void> => {
  const newTaskReq: ITask = req.body;

  const _id = req.user?._id;

  const newTask = new Task({ ...newTaskReq, owner: _id });
  await newTask.save();

  res.status(201).json({
    message: `Add task with id ${newTask._id}`,
    newTask: newTask,
  });
};

export default addTask;

// const TODOS: Todo[] = [];

// export const createTodo: RequestHandler = (req, res, next) => {
//   const text = (req.body as { text: string }).text;
//   const newTodo = new Todo(Math.random().toString(), text);

//   TODOS.push(newTodo);

//   res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
// };

// export const getTodos: RequestHandler = (req, res, next) => {
//   res.json({ todos: TODOS });
// };

// export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
//   const todoId = req.params.id;

//   const updatedText = (req.body as { text: string }).text;

//   const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

//   if (todoIndex < 0) {
//     throw new Error("Could not find todo!");
//   }

//   TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

//   res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
// };

// export const deleteTodo: RequestHandler = (req, res, next) => {
//   const todoId = req.params.id;

//   const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

//   if (todoIndex < 0) {
//     throw new Error("Could not find todo!");
//   }

//   TODOS.splice(todoIndex, 1);

//   res.json({ message: "Todo deleted!" });
// };
