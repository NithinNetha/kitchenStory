import { AdminModel } from './admin.model';
import { AdminService } from './../services/admin.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ProductModel } from './product.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  formValue !: FormGroup;
  formValueChange!:FormGroup;
  productModelObj:ProductModel=new ProductModel();
  adminModelObj:AdminModel=new AdminModel();
  productList:any;
  adminList:any;
  currentAdmin:any;
  OPass:string;
  NPass:string;
  showAdd !: boolean;
  showUpdate !: boolean;
  action!:boolean;
  constructor(private productService:ProductService,private frombuilder:FormBuilder,private adminService:AdminService) { }

  ngOnInit(): void {
    this.formValue=this.frombuilder.group({
      title:[''],
      category:[''],
      price:0,
      image:['']
    })
    this.formValueChange=this.frombuilder.group({
      oldPass:[''],
      newPass:['']
    })
    this.getAllProducts();
    this.getAllAdmins();
  }
  getAllProducts(){
    this.productService.getProducts().subscribe(res=>{
      this.productList=res;
    })
  }
  clickAddProduct(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postProductDetails(){
    this.productModelObj.title=this.formValue.value.title;
    this.productModelObj.category=this.formValue.value.category;
    this.productModelObj.price=this.formValue.value.price;
    this.productModelObj.image=this.formValue.value.image;
    //console.log(this.productModelObj)
    this.productService.postProduct(this.productModelObj)
    .subscribe(res=>{
      alert("Product Added Sucessfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllProducts();
    },
    err=>{

      alert("Something went wrong");
    })
  }

  deleteProduct(row:any){
    this.productService.deleteProduct(row.id).subscribe(res=>{
      alert('Product Deleted')
      this.getAllProducts();
    })
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.productModelObj.id=row.id;
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['category'].setValue(row.category);
    this.formValue.controls['price'].setValue(row.price);
    this.formValue.controls['image'].setValue(row.image);
  }

  updateProductDetails(){
    this.productModelObj.title=this.formValue.value.title;
    this.productModelObj.category=this.formValue.value.category;
    this.productModelObj.price=this.formValue.value.price;
    this.productModelObj.image=this.formValue.value.image;

    this.productService.updateProduct(this.productModelObj,this.productModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllProducts();
    })
  }

  getAllAdmins(){
    this.adminService.getAdmins().subscribe(res=>{
      this.adminList=res;
    })
    //this.currentAdmin=localStorage.getItem("adminDetails")
    //console.log('current'+this.currentAdmin);
   // console.log('Current Uname'+this.currentAdmin.username);
    //console.log('Current Pass'+this.currentAdmin.password);

  }
  ChangePass(){
    this.adminModelObj.id=parseInt(localStorage.getItem("adminID")) 
    this.adminModelObj.username=localStorage.getItem("adminUname");
    this.adminModelObj.password=localStorage.getItem("adminPass");
    console.log('OldPass ' + this.formValueChange.value.oldPass)
    if(this.adminModelObj.password===this.formValueChange.value.oldPass){
      this.adminModelObj.password=this.formValueChange.value.newPass;
      localStorage.setItem("adminPass",this.adminModelObj.password);
      this.adminService.updateAdmin(this.adminModelObj,this.adminModelObj.id)
      .subscribe(res=>{
        alert("Password Changed Successfully")
        let ref = document.getElementById('cancelChange')
        ref?.click();
        this.formValueChange.reset();
      })
    }else{
      this.formValueChange.reset();
      alert("Old Password didn't match");
    }
  }
}
