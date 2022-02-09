import { BaseModel } from './BaseModel';

export interface Cart extends BaseModel {
  items: { [id: string]: number };
  uid: string | null;
}

export interface CartItem {
  productId: string;
  amount: string;
}
