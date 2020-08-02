import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;

  constructor(private router:Router,private snackbar:MatSnackBar,private loginService: LoginService){ }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.username==="admin" && this.password == "admin"){
      //localstorage code here
      localStorage.setItem("loggedIn","true");
      this.loginService.loginValue("true");
      this.router.navigate(['flights']);
    }

    else{
        this.snackbar.open('Invalid username or Password', 'Error', {
          duration: 3000,
        });
    }

  }
}
