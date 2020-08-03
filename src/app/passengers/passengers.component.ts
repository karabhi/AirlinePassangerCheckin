import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Passenger } from '../model/passenger.model';
import { PassengerService } from './passenger.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
  
  loggedIn : string;
  public passengers : Passenger[];
  // public passengers : Passenger[]=this.passengerService.getPassengers();

  //subscription : Subscription
  // subscription : Subscription = this.passengerService.passengersChanged.subscribe(
  //   (passengers:Passenger[])=>{this.passengers = passengers}
  // );

  displayedColumns: string[] = ['passportNumber', 'name', 'age', 'gender', 
  'flightNo', 'wheelChair', 'isInfant', 'ancillaryServices', 'seatNo'];

  public dataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private passengerService : PassengerService, private router : Router) { }

  ngOnInit(): void {
    
    this.passengers = this.passengerService.getPassengers();
    this.dataSource = new MatTableDataSource(this.passengers);
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loggedIn = localStorage.getItem("loggedIn");

    if(this.loggedIn==null){
      this.router.navigate(['login']);
    }
    // this.subscription = this.passengerService.passengersChanged.subscribe(
    //   (passengers:Passenger[])=>{this.passengers = passengers}
    // )
  }
}
