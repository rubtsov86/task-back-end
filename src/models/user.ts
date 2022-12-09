import mongoose from "mongoose";
import Joi from "joi";
import { IUser } from "../interfaces/IUser";

const userSchema = new mongoose.Schema<IUser>(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 5,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema: Joi.Schema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(5).required(),
  email: Joi.string()
    .email({
      tlds: { allow: false },
    })
    .required(),
});

const updateRoleSchema = Joi.object({
  role: Joi.string().valid("USER", "ADMIN").required(),
});

const resendValidationSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: false },
    })
    .required(),
});

const User = mongoose.model<IUser>("user", userSchema);

export { User, joiSchema, updateRoleSchema, resendValidationSchema };
