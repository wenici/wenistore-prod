

export interface Roles {
    subscriber?: boolean;
    client?: boolean;
    admin?: boolean;
}

export interface User {
    id?: string;
    nom?: string;
    email?: string;
    createdAd?: any;
    password?: string;
    phone?: number;
    photoURL?: string;
    role?: Roles;
    // emailVerified: string;
}
