import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  searchKey:string
  public productList:any
  constructor(private proApi:ProductService,private cartService:CartService,) { }

  ngOnInit(): void {
    this.proApi.getProducts().subscribe(res=>{
      this.productList=res;
      this.productList.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      });
    })
  }
  addToCart(product:any){
    this.cartService.addToCart(product);
  }
  Search(){
    if(this.searchKey==""){
      this.ngOnInit();
    }else{
      this.productList=this.productList.filter(res=>{
        return res.title.toLocaleLowerCase().match(this.searchKey.toLocaleLowerCase())
      })
    }
  }

}
