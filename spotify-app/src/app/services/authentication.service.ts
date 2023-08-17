import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { userDetails } from '../model/userdetails';
import { User } from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  register(user:any){
    return this.http.post<any>("http://localhost:8091/register",user,{responseType:'text' as 'json'});
  }

  getUser(email:any) : Observable<any> {
    return this.http.get<any>(`http://localhost:8091/user/${email}`);
  }

  loginUser(user:any){
    return this.http.post<any>("http://localhost:8080/login",user);
  }

  checkLoginStatus():boolean {
      let status = localStorage.getItem("token");
      if(status){
        return true;
      }
      return false;
  }

  public loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

  get isLoggedIn(){
    return this.loginStatus.asObservable(); 
  }

  login(){
    this.loginStatus.next(true);
  }

  logout(){
    this.loginStatus.next(false);
    window.localStorage.setItem("token","");
    window.localStorage.setItem("email","");
  }
}
