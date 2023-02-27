import  { Cart, CartLocal } from './cart.model';

export interface CheckoutFirestore {
  id?: string;
  order: Cart[];
  userID: string;
  lieuDeLiraison?: string;
  modePayement?: string
  typeDelivraison?: string;
  createdAt?: Date;
  delireryAt?: string;
  dateDeLiraison?: string;
}

export interface CheckoutLocal {
    id?: string;
    order: CartLocal[];
    userName: string;
    phone?: string;
    email?: string;
    lieuDeLiraison?: string;
    modePayement?: string
    typeDelivraison?: string;
    createdAt?: any;
    delireryAt?: string;
    dateDeLiraison?: string;
}

