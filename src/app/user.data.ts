import { DataUser } from './models/app.model';

export const userData: Array<DataUser> = [
  {
    name: 'Fariz',
    email: 'fariz@mail.com',
    paymentDeadline: new Date(2024, 8, 15),
    city: 'Tangerang',
    province: 'Banten',
    zipcode: 10205,
    isChecked: false,
    age: 25,
    basicSalary: '25000',
  },
  {
    name: 'Rizky',
    email: 'Rizky@mail.com',
    paymentDeadline: new Date(2024, 8, 20),
    city: 'Tangerang Selatan',
    province: 'Banten',
    zipcode: 10310,

    isChecked: false,
    age: 25,
    basicSalary: '25000',
  },
];
