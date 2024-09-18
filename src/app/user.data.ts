import { DataUser } from './app.model';

export const userData: Array<DataUser> = [
  {
    name: 'Fariz',
    email: 'fariz@mail.com',
    paymentDeadline: new Date(2024, 8, 15),
    address: {
      city: 'Tangerang',
      province: 'Banten',
      zipcode: 10205,
    },
    isChecked: false,
  },
  {
    name: 'Rizky',
    email: 'Rizky@mail.com',
    paymentDeadline: new Date(2024, 8, 12),
    address: {
      city: 'Tangerang Selatan',
      province: 'Banten',
      zipcode: 10310,
    },
    isChecked: false,
  },
];
