import { Cart } from '../models/Cart';

export const countTotalItemsInCart = (cart: Cart): number =>
  Object.values(cart.items).reduce((s, c) => s + c, 0);

export const cartKeys = (cart: Cart): string[] => Object.keys(cart.items);
