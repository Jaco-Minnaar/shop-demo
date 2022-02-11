import { BaseModel } from './BaseModel';

export interface Cart extends BaseModel {
  items?: NumberMap;
  uid: string | null;
}
