import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderTableComponent } from './order-table/order-table.component';

@NgModule({
  declarations: [NavbarComponent, ProductCardComponent, OrderTableComponent],
  imports: [CommonModule, RouterModule, NgbDropdownModule],
  exports: [NavbarComponent, ProductCardComponent, OrderTableComponent],
})
export class SharedModule {}
