export interface IUserRequest {
  name: string;
  password: string;
  email: string;
}

export interface IUser extends IUserRequest {
  // name: string;
  // password: string;
  // email: string;
  role: "ADMIN" | "USER";
  token: string;
}
