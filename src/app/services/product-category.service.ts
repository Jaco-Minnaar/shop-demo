import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Service } from './service';
import { ProductCategory } from '../models/ProductCategory';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService extends Service<ProductCategory> {
  constructor(db: Database) {
    const path = '/productCategories';
    super(db, path);
  }
}
