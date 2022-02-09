import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NavbarComponent, ProductCardComponent],
  imports: [CommonModule, RouterModule, NgbDropdownModule],
  exports: [NavbarComponent, ProductCardComponent],
})
export class SharedModule {}
