import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAdmins(){
    return this.http.get<any>("http://localhost:3000/Admin")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateAdmin(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/Admin/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
