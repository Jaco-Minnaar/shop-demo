import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/Order';
import { ShippingInfo } from 'src/app/models/ShippingInfo';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit {
  @Output('newOrderPlaced') shippingInfoSubmitted =
    new EventEmitter<ShippingInfo>();

  shippingForm?: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      ['name']: ['', Validators.required],
      ['address-line-1']: ['', Validators.required],
      ['address-line-2']: ['', Validators.required],
      ['address-line-3']: [''],
      ['city']: ['', Validators.required],
    });
  }

  submitShippingInfo() {
    if (!this.shippingForm || this.shippingForm.invalid) return;

    const shippingInfo: ShippingInfo = {
      name: this.shippingForm.get('name')?.value ?? '',
      addressLine1: this.shippingForm.get('address-line-1')?.value ?? '',
      addressLine2: this.shippingForm.get('address-line-2')?.value ?? '',
      addressLine3: this.shippingForm.get('address-line-3')?.value ?? '',
      city: this.shippingForm.get('city')?.value ?? '',
    };

    this.shippingInfoSubmitted.emit(shippingInfo);
  }
}
