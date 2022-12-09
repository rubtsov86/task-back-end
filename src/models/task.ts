import Joi from "joi";
import mongoose from "mongoose";
import ITask from "../interfaces/ITask";

const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const taskSchema = new mongoose.Schema<ITask>(
  {
    client: {
      name: {
        type: String,
        required: [true, "Set name for contact"],
      },
      email: { type: String, required: true },
      phone: { type: String, required: true, math: phoneRegexp },
      id: { type: Number, required: true },
    },

    car: {
      type: { type: String, required: true },
      model: { type: String, required: true },
      year: { type: String, required: true },
    },

    date: {
      create: Date,
      current: Date,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: ["NEW", "IN PROGRESS", "DONE", "FAILED"],
      default: "NEW",
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema: Joi.Schema<ITask> = Joi.object({
  client: {
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .required(),
    phone: Joi.string().pattern(phoneRegexp).required(),
    id: Joi.number(),
  },
  car: {
    type: Joi.string(),
    model: Joi.string(),
    year: Joi.number(),
  },
  date: {
    create: Date,
    current: Date,
  },
});

const updateStatusSchema: Joi.Schema<ITask> = Joi.object({
  status: Joi.string().valid("NEW", "IN PROGRESS", "DONE", "FAILED").required(),
});

const Task = mongoose.model<ITask>("task", taskSchema);

export { Task, addSchema, updateStatusSchema };
