import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteServiceService {

  constructor(private route:Router) { }

  toHome(){
    this.route.navigate(['home']);
  }

}
