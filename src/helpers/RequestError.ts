interface IError extends Error {
  status?: number;
}

const RequestError = (status: number, message: string): Error => {
  const error: IError = new Error(message);
  error.status = status;
  return error;
};

export default RequestError;
