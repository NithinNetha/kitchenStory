import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  formValue !: FormGroup;
  adminData!:any;
  error:boolean;
  uname:string;
  password:string;
  constructor(private adminService:AdminService, private formBuilder:FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      username:[''],
      password:['']
    })
    this.getAllAdmins();
  }

  getAllAdmins(){
    this.adminService.getAdmins().subscribe(res=>{
      this.adminData=res;
    })
  }

  authenticate(){
    this.uname=this.formValue.value.username;
    this.password=this.formValue.value.password;
    let user = this.adminData.find(x=>x.username===this.uname && x.password===this.password);

    if(!user){
      this.error=true;
      this.formValue.reset();
    }else{
      for (var key of Object.keys(user)) {
        localStorage.setItem('adminID',user[key]);
       break;
      }
      localStorage.setItem('adminUname',this.uname);
      localStorage.setItem('adminPass',this.password)
      console.log('LocalStr'+localStorage.getItem('adminUname'));
      console.log('LocalStr'+localStorage.getItem('adminPass'));
      this.router.navigate(['/dashboard']);
    }

  }
}
