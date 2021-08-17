import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  grandTotal:any;

  constructor(private cartService:CartService) {  }
  ngOnInit(): void {
    this.grandTotal=this.cartService.getTotalPrice();
    this.grandTotal+=9;
  }

}
