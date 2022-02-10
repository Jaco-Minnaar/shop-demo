import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { OrdersComponent } from './profile/orders/orders.component';
import { LoginComponent } from './auth/login/login.component';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { ProductCardComponent } from './common/product-card/product-card.component';
import { SharedModule } from './common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, OrdersComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NavbarComponent, ProductCardComponent],
})
export class AppModule {}
