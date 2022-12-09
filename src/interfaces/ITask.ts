interface ICLient {
  name: string;
  email: string;
  phone: string;
  id: number;
}

interface ICar {
  type: string;
  model: string;
  year: number;
}

interface IDate {
  create: Date;
  current: Date;
}

interface ITask {
  client: ICLient;
  car: ICar;
  date: IDate;
  owner: any;
  status: "NEW" | "IN PROGRESS" | "DONE" | "FAILED";
}

export default ITask;
