import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Passenger } from '../model/passenger.model';
import { PassengerService } from './passenger.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';


// const passengers2 : Passenger[] = [
//     {passportNumber: '344416785', name : 'test', age : '33', gender: 'FEMALE', checkedIn: true, isInfant : false, wheelChair: true, ancillaryServices:false} 
// ]
@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {

  public passengers : Passenger[]=this.passengerService.getPassengers();
  //private subscription : Subscription;

  displayedColumns: string[] = ['passportNumber', 'name', 'age', 'gender', 
  'flightNo', 'wheelChair', 'isInfant', 'ancillaryServices', 'seatNo'];

  dataSource = new MatTableDataSource(this.passengers);
  //dataSource2 = new MatTableDataSource<Passenger>(this.passengers);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private passengerService : PassengerService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //console.log(this.dataSource)
  }
}
