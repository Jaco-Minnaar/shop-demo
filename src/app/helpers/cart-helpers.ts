import { Cart } from '../models/Cart';

export const countTotalProductsInMap = (map: NumberMap): number =>
  Object.values(map ?? {}).reduce((s, c) => s + c, 0);

export const mapKeys = (map: NumberMap): string[] => Object.keys(map ?? {});
