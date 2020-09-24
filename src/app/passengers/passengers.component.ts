import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Passenger } from '../model/passenger.model';
import { PassengerService } from './passenger.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UselessInfo } from '../model/useless-info.model';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
  
  loggedIn : string;
  public passengers : Passenger[];
  missingInfoFlag : boolean = false;
  uselessInfo : UselessInfo[];

  passengersWithMissingInfo : UselessInfo[] = [];
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

    this.uselessInfo = this.passengerService.getUselessInfo();
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loggedIn = localStorage.getItem("loggedIn");

    if(this.loggedIn==null){
      this.router.navigate(['login']);
    }
    // this.subscription = this.passengerService.passengersChanged.subscribe(
    //   (passengers:Passenger[])=>{this.passengers = passengers}
    // )

    for(let i=0; i<this.uselessInfo.length;i++){
      if(this.uselessInfo[i].address == null || this.uselessInfo[i].dateOfBirth == null){
        this.passengersWithMissingInfo.push(this.uselessInfo[i])
      }
    }
  }

  checkName(passNo : string){
    return this.passengers.find(x=>x.passportNumber == passNo).name;
  }

  onMissingDetailsSave(passNo:string,dob:string,address:string){
    // console.log(passNo +"  "+ dob+"  " + address)
    this.passengerService.editUselessInfo(passNo,dob,address);
    this.missingInfoFlag = false;
  }
}
