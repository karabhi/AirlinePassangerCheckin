import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
      localStorage.setItem("loggedIn","admin");
      this.loginService.loginValue("admin");
      this.router.navigate(['flights']);
    }
    else if(this.username==="staff" && this.password == "staff"){
      //localstorage code here
      localStorage.setItem("loggedIn","staff");
      this.loginService.loginValue("staff");
      this.router.navigate(['flights']);
    }

    else{
        this.snackbar.open('Invalid username or Password', 'Error', {
          duration: 3000,
        });
    }

  }
}
