export interface Employee {
  paymentDeadline: Date;
  username: string;
  name: string;
  email: string;
  basicSalary: string;
  city: string;
  province: string;
  zipcode: string;
  age: number;
  isChecked?: boolean;
  id?: string;
}
