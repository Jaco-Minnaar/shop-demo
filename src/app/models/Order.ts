import { BaseModel } from './BaseModel';
import { ShippingInfo } from './ShippingInfo';

export interface Order extends BaseModel {
  uid: string;
  items: NumberMap;
  shipping: ShippingInfo;
  date: number;
}
