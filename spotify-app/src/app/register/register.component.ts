import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../services/authentication.service';
import { RouteServiceService } from '../services/route-service.service';
import { Dialog } from '@angular/cdk/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hide:boolean = true;

  constructor(private form: FormBuilder, private routeService: RouteServiceService, private auth: AuthenticationService,private snackBar:MatSnackBar, public dialogRef: Dialog) { }

  registrationDetails = this.form.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
    confirmPassword: ['', Validators.required]
  })

  get username() { return this.registrationDetails.get('username'); }
  get email() { return this.registrationDetails.get('email'); }
  get password() { return this.registrationDetails.get('password'); }
  get confirmPassword() { return this.registrationDetails.get('confirmPassword'); }


  isSubmitted = false;
  isRegistered = false;

  userDetails = {
    email:'',
    password:''
  }

  user: any = {
    username: '',
    email: '',
    password: '',
    role: 'user',
    trackList: [],
    songIds:[]
  }

  registered() {
    this.auth.register(this.user).subscribe({
      next: data => {
        data = this.user;
        this.isRegistered = true;
        this.userDetails.email = this.user.email
        this.userDetails.password = this.user.password
        this.login();
        // window.localStorage.setItem("email",this.user.email);
      },
      error: err => {
        alert("This email id("+this.user.email+") is already registered");
      }
    });
  }

  authDetails: any;

  login() {
    console.log(this.userDetails);
    this.auth.loginUser(this.userDetails).subscribe({
      next: data => {
        this.authDetails = data;
        window.localStorage.setItem("token", this.authDetails.token);
        window.localStorage.setItem("email", this.authDetails.email);
        this.routeService.toHome();
        this.auth.login();
        this.snackBar.open('Registration Successful', 'OK', {​
          duration: 3000,​
           panelClass: ['mat-toolbar', 'mat-primary']​
         });
      },
      error: err => {
        alert("Database Error. Try again");
      }
    })
    this.dialogRef.closeAll()
  }

  openLogin(){
    this.dialogRef.closeAll();
    this.dialogRef.open(LoginComponent);
  }

  closeRegister(){
    this.dialogRef.closeAll();
  }
  
  // this.auth.get().subscribe({
  //   next:data => {
  //     const email = data.find((user:any)=>{
  //       return this.registrationDetails.value.email === user.email
  //     });
  //     if(email){
  //       alert('This email id is already registered');
  //     }
  //     else{

  //     // this.isSubmitted = true;
  //     // this.isRegistered = true;
  //   },
  //   error:err => {
  //     alert('SERVER Error occured');
  //     // this.isRegistered = false;
  //   }
  // })
  // }

}
