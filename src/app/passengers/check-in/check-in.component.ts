import { Component, OnInit } from '@angular/core';
import { Seat } from 'src/app/model/seat.model';
import { PassengerService } from '../passenger.service';
import { Passenger } from 'src/app/model/passenger.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  constructor( private passengerService : PassengerService,
               private route : ActivatedRoute,
               private _snackBar: MatSnackBar,
               private router : Router) { }

  numberOfRows : number = 21;
  flightPassangers : Passenger[];
  blockedSeats : string[] = [];
  // seats not used
  seats : Seat[] = [];
  clicked : boolean = false;
  currentPassengerSeat : string;

  private subscription : Subscription;


  ngOnInit(): void {
    this.getSeatNo();
    this.flightPassangers = this.passengerService.getPassengersOfFlight(this.route.snapshot.params['id']);
    
    //not necessary
    this.route.params.subscribe(
      (params) => {
        this.flightPassangers = this.passengerService.getPassengersOfFlight(this.route.snapshot.params['id']);
      }
    )
    
    this.flightPassangers.forEach((passenger) => {
      if(passenger.seatNo!=null){
        this.blockedSeats.push(passenger.seatNo)
      }
    })

    var loggedIn = localStorage.getItem("loggedIn");

    if(loggedIn==null){
      this.router.navigate(['login']);
    }
    }
  
  //Check whether seat is blocked in the current flight
  checkSeatBlocked(seat:string):boolean{
    if(this.blockedSeats.find(x => x === seat)!=null){
      return true;
    }
    else{
      return false;
    }
  }

  // Used for looping seats in HTML
  arrayN(n: number): number[] {
    return [...Array(n).keys()];
  }

  onSeatSelected(seat : string){
    
    if(this.checkSeatBlocked(seat)){
      this._snackBar.open('Seat already blocked', 'Error!', {
        duration: 4000,
      });
    }
    else{
      this.passengerService.setPassengerSeat(this.route.snapshot.queryParams.passId,seat)
    }
    this.clicked = true;
  }

  getSeatNo(){
    this.currentPassengerSeat = this.passengerService.getPassengerSeat(this.route.snapshot.queryParams.passId);
    this.subscription = this.passengerService.passengerSeatChanged.subscribe(
      (seat : string) => {
        this.currentPassengerSeat = seat
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
