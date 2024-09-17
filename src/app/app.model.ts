export interface DataUser {
    name: string;
    age: number;
    address: Array<Address>;
}

interface Address {
    zipcode?: number;
    district: string;
    city: string;
    province: string;
}