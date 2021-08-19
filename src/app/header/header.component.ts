import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem:number=0;
  productList:any;
  public show:boolean;
  public logo:boolean;
  constructor(private cartService:CartService,private prodApi:ProductService) { }

  ngOnInit(): void {
    this.cartService.getProduct().subscribe(res=>{
      this.totalItem=res.length;
    })
    this.prodApi.getProducts().subscribe(res=>{
      this.productList=res;
    })
  }

}
