import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
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
  newProduct = true;

  formChangeSub?: Subscription;

  get title(): string {
    return this.productForm.get('title')?.value ?? '';
  }

  get price(): number {
    return this.productForm.get('price')?.value ?? '';
  }

  get category(): string {
    return this.productForm.get('category')?.value ?? '';
  }

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
      this.product = {
        id: '',
        name: '',
        price: -1,
        categoryId: '-1',
        imageUrl: '',
      };

      this.newProduct = true;

      this.createForm();
      return;
    }

    this.newProduct = false;

    firstValueFrom(this.productService.getItem(id)).then((product) => {
      if (!product) {
        this.location.back();
        return;
      }

      this.product = product;
      this.createForm();
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
      !this.newProduct
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

  private createForm() {
    this.productForm = this.fb.group({
      title: [this.product?.name ?? '', Validators.required],
      price: [
        (this.product?.price ?? '') >= 0 ? this.product?.price : '',
        Validators.required,
      ],
      category: [this.product?.categoryId ?? -1, Validators.required],
      imageUrl: [this.product?.imageUrl ?? '', Validators.required],
    });

    this.formChangeSub = this.productForm.valueChanges.subscribe(() => {
      if (!this.product) return;
      console.log('changes');
      this.product.name = this.title;
      this.product.price = this.price;
      this.product.categoryId = this.category;
      this.product.imageUrl = this.imageUrl;
    });

    this.loading = false;
  }
}
