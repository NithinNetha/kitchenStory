import { CustomerService } from './../services/customer.service';
import { CustomerModel } from './customer-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators, } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-get-customer',
  templateUrl: './get-customer.component.html',
  styleUrls: ['./get-customer.component.css']
})
export class GetCustomerComponent implements OnInit {
  formValue!:FormGroup;
  name:FormControl;
  email:FormControl;
  contact:FormControl;
  address:FormControl;
  customerObj:CustomerModel=new CustomerModel();
  constructor(private formbuilder:FormBuilder,private customerService:CustomerService,private cartService:CartService) { }

  ngOnInit(): void {
    this.name=new FormControl('',Validators.required)
    this.email=new FormControl('',[Validators.required,Validators.email])
    this.contact=new FormControl('',[Validators.required,Validators.minLength(8)])
    this.address=new FormControl('',Validators.required)
    this.formValue=this.formbuilder.group({
      name:this.name,
      email:this.email,
      contact:this.contact,
      address:this.address
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
