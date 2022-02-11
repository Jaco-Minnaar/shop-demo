import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
  @Input('orders') orders?: Order[];

  formatDate(date: number): string {
    if (!date) return '';

    return new Date(date).toLocaleString();
  }

  constructor() {}

  ngOnInit(): void {}
}
