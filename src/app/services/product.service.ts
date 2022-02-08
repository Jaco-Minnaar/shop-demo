import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Service } from '../common/service';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends Service<Product> {
  constructor(db: Database) {
    const path = '/products';
    super(db, path);
  }
}
