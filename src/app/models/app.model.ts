export interface DataUser {
    name: string;
    email: string;
    paymentDeadline: Date;
    address: Address;
    isChecked: Boolean;
}

interface Address {
    province: string;
    city: string;
    zipcode: number;
}