import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../services/authentication.service';
import { RouteServiceService } from '../services/route-service.service';
import { Observable } from 'rxjs';
import { RegisterComponent } from '../register/register.component';
import { MiniPlayerComponent } from '../mini-player/mini-player.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})

export class TopNavbarComponent implements OnInit {

  constructor(private router: Router, public dialogRef: Dialog, private auth: AuthenticationService, private route: RouteServiceService,private player:HomeComponent) { }

  loginStatus$?: Observable<boolean>;
  isLoggedIn:boolean = false;

  ngOnInit(): void {
    this.loginStatus$ = this.auth.isLoggedIn;

    const topNav = document.querySelector('.top-nav');
    const logo = document.querySelector('.spotify');
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        topNav?.classList.add('sticky');
        logo?.classList.add('color')
      }
      else {
        topNav?.classList.remove('sticky');
        logo?.classList.remove('color');
      }
    })
  }

  toHome() {
    this.router.navigateByUrl('home');
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
  }
  
  toSongs() {
    this.router.navigateByUrl('home').then((success) => {
      document.getElementById('songs-menu')?.scrollIntoView({ behavior: 'smooth' });
    })
  }

  toMelodies() {
    this.router.navigateByUrl('playlist');
  }

  openLogin() {
    this.dialogRef.open(LoginComponent)
  }

  openRegister() {
    this.dialogRef.open(RegisterComponent)
  }

  logout() {
    this.auth.logout();
    this.route.toHome();
    this.isLoggedIn = false;
    const audio = <HTMLAudioElement>document.getElementById('audio');
    audio.pause()
    audio.currentTime = 0;
  }

}
