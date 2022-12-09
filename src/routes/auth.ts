import { Router } from "express";

import ctrlWrapper from "../helpers/ctrlWrapper";
import signup from "../controllers/auth/signup";
import login from "../controllers/auth/login";
import logout from "../controllers/auth/logout";

import auth from "../middlewares/auth";

import validationBody from "../middlewares/validationBody";
import { joiSchema } from "../models/user";

const router = Router();

router.post("/signup", validationBody(joiSchema), ctrlWrapper(signup));

router.post("/login", ctrlWrapper(login));

router.get("/logout", auth, ctrlWrapper(logout));

export default router;
