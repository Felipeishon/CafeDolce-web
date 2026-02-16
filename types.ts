
export type Language = 'es' | 'it' | 'en';

export interface LocalizedString {
  es: string;
  it: string;
  en: string;
}

export interface Product {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  image: string;
  category: 'coffee' | 'bakery' | 'lunch' | 'sandwiches' | 'drinks';
}

export interface CartItem extends Product {
  quantity: number;
  preferences: string[];
  uniqueCartId: string;
}

export type ViewType = 'home' | 'menu' | 'contact' | 'profile';
