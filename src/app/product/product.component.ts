import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  searchKey: string
  public FullList: any
  public searchList: any
  constructor(private proApi: ProductService, private cartService: CartService,) { }

  ngOnInit(): void {
    this.proApi.getProducts().subscribe(res => {
      this.searchList = res;
      this.searchList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    })
    this.getAllProducts()
  }
  getAllProducts() {
    this.proApi.getProducts().subscribe(res => {
      this.FullList = res;
      this.FullList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    })
    this.searchList=this.FullList;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  Search() {
    if (this.searchKey == "") {
      this.ngOnInit();
    } else {
      this.searchList = this.FullList.filter(res => {
        return res.title.toLowerCase().match(this.searchKey.toLowerCase())
      })
    }
  }

  SearchCatPie() {
    this.searchList = this.FullList.filter(res => {
      return res.category.toLowerCase().match("pie")
    })
  }

  AllCatPie() {
    this.searchList=this.FullList
    console.log('All Search'+this.searchList)
    console.log('ALl Full'+this.FullList)
  }

  SearchCatTarts() {
    this.searchList = this.FullList.filter(res => {
      return res.category.toLowerCase().match("tart")
    })
  }
  SearchCatMeal() {
    this.searchList = this.FullList.filter(res => {
      return res.category.toLowerCase().match("meal")
    })
  }
  SearchCatPastie() {
    this.searchList = this.FullList.filter(res => {
      return res.category.toLowerCase().match("pastie")
    })
  }
}
