import { CustomerService } from './../services/customer.service';
import { CustomerModel } from './customer-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, } from '@angular/forms';

@Component({
  selector: 'app-get-customer',
  templateUrl: './get-customer.component.html',
  styleUrls: ['./get-customer.component.css']
})
export class GetCustomerComponent implements OnInit {
  formValue!:FormGroup;
  customerObj:CustomerModel=new CustomerModel();
  constructor(private formbuilder:FormBuilder,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      name:[''],
      email:[''],
      contact:[''],
      address:['']
    })
  }
  saveCustomer(){
    this.customerObj.name=this.formValue.value.name;
    this.customerObj.email=this.formValue.value.email;
    this.customerObj.contact=this.formValue.value.contact;
    this.customerObj.address=this.formValue.value.address;
    this.customerService.saveCustomer(this.customerObj);
  }

}
