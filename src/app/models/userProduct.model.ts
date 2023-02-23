import { User } from "./user.model";
import { Product } from "./product.model";

export interface UserProduct {
  uid?: string,
  productData?: Product,
  userData?: User
}
