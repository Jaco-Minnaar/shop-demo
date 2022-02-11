import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../common/common.module';
import { ProfileRouterModule } from './profile-router.module';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, ProfileRouterModule, SharedModule],
})
export class ProfileModule {}
