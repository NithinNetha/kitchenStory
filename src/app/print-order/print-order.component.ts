import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { formatDate } from '@angular/common'

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.css']
})
export class PrintOrderComponent implements OnInit {
  todayDate:any
  constructor(private cartService:CartService,private custService:CustomerService) { }
  cartList:any;
  custName:string;
  custEmail:string;
  custContact:string;
  custAddress:string;
  total:any;
  grandtotal:any;

  ngOnInit(): void {
    this.cartList=this.cartService.cartItemList;
    this.custName=this.custService.customerDetails.name;
    this.custEmail=this.custService.customerDetails.email;
    this.custContact=this.custService.customerDetails.contact;
    this.custAddress=this.custService.customerDetails.address;
    this.todayDate=formatDate(new Date(),'dd MMM, yyyy','en');
    this.total=this.cartService.getTotalPrice();
    this.grandtotal=this.total+9;
    this.cartService.removeAllCart();
  }
  printOrder(){
    window.print();
  }
}
