export interface DataUser {
  name: string;
  email: string;
  paymentDeadline: Date;
  province: string;
  city: string;
  zipcode: number;
  isChecked: Boolean;
  basicSalary: string;
  age: number;
  id?: string;
}
