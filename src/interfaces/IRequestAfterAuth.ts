import { IUser } from "./IUser";
import { Request } from "express";

interface ILoginUser extends IUser {
  _id: any;
}

export interface IRequestAfterAuth extends Request {
  user?: ILoginUser;
}
