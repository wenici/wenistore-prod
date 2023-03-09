export interface User {
    uid?: string;
    nom?: string;
    nomShop?: string;
    address?: string;
    email?: string;
    createdAd?: any;
    password?: string;
    phone?: number;
    roles?: Roles;
}

export interface Roles {
  subscriber?: boolean,
  shop?: boolean,
  admin?: boolean
}
