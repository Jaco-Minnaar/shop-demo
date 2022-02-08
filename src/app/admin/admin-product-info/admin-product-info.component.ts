import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
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

  productForm: FormGroup = new FormGroup({});
  product?: Product;
  loading = true;

  get imageUrl(): string {
    return this.productForm.get('imageUrl')?.value ?? '';
  }

  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.categories = this.productCategoryService.getItems();

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) return;

    if (id === 'new') {
      console.log('new product');
      this.createForm();
      return;
    }

    firstValueFrom(this.productService.getItem(id)).then((product) => {
      if (!product) {
        this.location.back();
        return;
      }

      this.product = product;
      this.createForm(product);
    });
  }

  save() {
    const id = this.product?.id ?? '';
    console.log(this.productForm.errors);

    const name = this.productForm.get('title')?.value ?? '';
    const price = this.productForm.get('price')?.value ?? 0;
    const categoryId = this.productForm.get('category')?.value ?? 0;
    const imageUrl = this.productForm.get('imageUrl')?.value ?? '';
    const product: Product = {
      id,
      name,
      price,
      categoryId,
      imageUrl,
    };

    firstValueFrom(
      this.product
        ? this.productService.updateItem(product)
        : this.productService.createItem(product)
    )
      .then(() => this.location.back())
      .catch((err) => alert(err));
  }

  delete() {
    if (!this.product) return;
    firstValueFrom(this.productService.deleteItem(this.product.id))
      .then(() => this.location.back())
      .catch((err) => alert(err));
  }

  private createForm(product?: Product | undefined) {
    this.productForm = this.fb.group({
      title: [product?.name ?? '', Validators.required],
      price: [product?.price ?? '', Validators.required],
      category: [product?.categoryId ?? -1, Validators.required],
      imageUrl: [product?.imageUrl ?? '', Validators.required],
    });

    this.loading = false;
  }
}
