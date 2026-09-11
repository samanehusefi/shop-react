export interface IProductColor {
  title: string;
  hex: string;
}

export interface IProductShipping {
  available: boolean;
  fast: boolean;
  description: string;
}

export interface IProduct {
  id: number;
  title: string;
  english_title: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  old_price: number;
  discount: number;
  stock: number;
  rating: number;
  rating_count: number;
  status: string;
  is_promotion: boolean;
  is_amazing: boolean;
  seller: string;
  warranty: string;
  color: IProductColor;
  shipping: IProductShipping;
  url: string;
  created_at?: string;
}

export type ICreateProduct = Omit<IProduct, "id" | "created_at">;