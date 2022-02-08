import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-info',
  templateUrl: './admin-product-info.component.html',
  styleUrls: ['./admin-product-info.component.scss'],
})
export class AdminProductInfoComponent implements OnInit {
  categories: Observable<ProductCategory[]> | null = null;

  productForm: FormGroup | null = null;

  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categories = this.productCategoryService.getItems();
  }
}
