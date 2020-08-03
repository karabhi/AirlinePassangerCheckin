import { Component, OnInit } from '@angular/core';
import { PassengerService } from './passengers/passenger.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Passenger } from './model/passenger.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'airline-checkin-app';
  passengers : Passenger[];

  constructor(private passengerService:PassengerService,private http: HttpClient, private router:Router){}

  ngOnInit(){
    //localStorage.setItem("loggedIn",null);
    //this.router.navigate(['']);
    this.http.get('http://localhost:3000/passengers').subscribe(
      (res : any[])=>{
          for(let i=0;i<res.length;i++){
              this.passengerService.passengers.push({
                  passportNumber: res[i].id,
                  name : res[i].name,
                  age : res[i].age,
                  gender : res[i].gender,
                  flightNo : res[i].flightNo,
                  wheelChair : res[i].wheelChair,
                  isInfant : res[i].isInfant,
                  ancillaryServices : res[i].ancillaryServices,
                  seatNo : res[i].seatNo
              })
          }
      }
  );

  this.http.get('http://localhost:3000/ancillaryservices').subscribe(
      (res : any[])=>{
          for(let j=0;j<res.length;j++){
              this.passengerService.ancillaryServices.push({
                  passportNumber : res[j].id,
                  specialMeal :  res[j].specialMeal,
                  extraLuggage : res[j].extraLuggage,
                  extraLegSpace : res[j].extraLegSpace
              })
          }
      }
  );

  setTimeout(()=>{this.passengers = this.passengerService.passengers},500);
  }
}
