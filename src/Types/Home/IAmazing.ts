export interface IAmazingColor {
  title: string;
  hex: string;
}

export interface IAmazingPrice {
  selling: number;
  original: number;
  discount: number;
}

export interface IAmazingRating {
  rate: number;
  count: number;
}

export interface IAmazingBrand {
  title: string;
  logo: string;
}

export interface IAmazing {
  id: number;
  title: string;
  image: string;
  price: IAmazingPrice;
  timer: number;
  rating: IAmazingRating;
  brand: IAmazingBrand;
  colors?: IAmazingColor[];
  url: string;
}