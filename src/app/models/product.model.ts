export interface Product {
  id?: string;
  name: string;
  price: number;
  price_solde: number;
  description: string;
  fichetech: string;
  imageURL: string[];
  marque: string;
  taille: string;
  couleur: string;
  numero: string;
  category: string;
  quantity: number;
  isMyProduct: boolean;
  date: Date;
  // createdAt: Date;
}