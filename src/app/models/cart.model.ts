import { User } from './user.model';
import  { Product } from './product.model';
export interface Cart {
    id?: string;
    cartUserData: User;
    productData: Product;
    createdAt?: Date;
    quantity: number;
}
