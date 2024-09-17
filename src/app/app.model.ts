export interface DataUser {
    name: string;
    email: string;
    address: Address;
}

interface Address {
    province: string;
    city: string;
    zipcode: number;
}