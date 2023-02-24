import  { Product } from './product.model';
export interface Cart {
    id?: string;
    productData: Product;
    userID: string;
    createdAt?: any;
    quantity: number;
}
export interface CartLocal {
    id?: string;
    productData: Product;
    createdAt?: any;
}
