import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = window.localStorage.getItem("token");
    let authRequest = req;
    if(token != null){
      authRequest = req.clone({setHeaders:{Authorization:'Bearer '+token}})
    }
    return next.handle(authRequest);
  }

}
