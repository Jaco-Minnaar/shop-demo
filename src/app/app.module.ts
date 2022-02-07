import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CartComponent } from './components/cart/cart.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, NavBarComponent, CartComponent],
  imports: [BrowserModule, AppRoutingModule, NgbDropdownModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
