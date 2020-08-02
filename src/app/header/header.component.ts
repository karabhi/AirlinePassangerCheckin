import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn : String;
  private subscription : Subscription;

  constructor(private router : Router, private loginService : LoginService) { }

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem("loggedIn");

    this.subscription = this.loginService.loginChange.subscribe(
      (loggedIn : string) => {
        this.loggedIn = loggedIn
      }
    )
  }

  onLogout(){
    localStorage.setItem("loggedIn","false");
    this.loggedIn = "false"
    this.router.navigate(['/flights']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
