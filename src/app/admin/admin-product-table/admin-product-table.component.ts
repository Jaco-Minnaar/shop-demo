import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-table',
  templateUrl: './admin-product-table.component.html',
  styleUrls: ['./admin-product-table.component.scss'],
})
export class AdminProductTableComponent implements OnInit, OnChanges {
  products?: Observable<Product[]>;

  @Input('filter') filter: string | undefined;

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.products = this.productService.list$.pipe(
      map((products) =>
        products.filter((product) =>
          product.name.toLowerCase().match(this.filter?.toLowerCase() ?? '')
        )
      )
    );
  }

  ngOnInit(): void {
    this.products = this.productService.list$;
  }
}
