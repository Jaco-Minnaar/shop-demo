import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { CartComponent } from './shopping/cart/cart.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductsComponent } from './shopping/products/products.component';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AdminProductInfoComponent } from './admin/admin-product-info/admin-product-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminProductTableComponent } from './admin/admin-product-table/admin-product-table.component';
import { ProductCardComponent } from './common/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    OrdersComponent,
    LoginComponent,
    ProductsComponent,
    AdminProductInfoComponent,
    AdminProductTableComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
