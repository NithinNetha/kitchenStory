import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerDetails:any;
  constructor( private http : HttpClient) { }
  
  saveCustomer(data:any){
    this.customerDetails=data;
  }
}
