import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengerService } from 'src/app/passengers/passenger.service';
import { Passenger } from 'src/app/model/passenger.model';
import { Seat } from 'src/app/model/seat.model';
import { Subscription } from 'rxjs';
import { AncillaryService } from 'src/app/model/ancillary-service.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.css']
})
export class SeatMapComponent implements OnInit {

  constructor(private passengerService : PassengerService,
              private route : ActivatedRoute,
              private _snackBar: MatSnackBar,
              private router:Router) { }

  passengers : Passenger[];
  ancillaryServices : AncillaryService[];

  flightNumber : string;
  passengerOfSeatSelected : Passenger;
  passengerSelectedAncillaryServices : AncillaryService;
  seatSelectedFlag : boolean = false;

  numberOfRows : number = 21;
  flightPassangers : Passenger[];
  blockedSeats : string[] = [];
  // seats : Seat[] = [];
  // clicked : boolean = false;
  //currentPassengerSeat : string;

  private subscription : Subscription;


  ngOnInit(): void {
    //flight number from route URL
    this.flightNumber = this.route.snapshot.params['id'];
    //local copy of ancillary services
    this.ancillaryServices = this.passengerService.getAncillaryServices();
    this.passengers = this.passengerService.getPassengers();

    //rest of these lines in ngOnInit() are copied and used from checkin component
    //using the above local copies of passengers nad ancillary services preferred
    this.flightPassangers = this.passengerService.getPassengersOfFlight(this.flightNumber);
    
    this.route.params.subscribe(
      (params) => {
        this.flightPassangers = this.passengerService.getPassengersOfFlight(this.flightNumber);
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

  // Onclick of any particular seat is handled here
  onSeatSelected(seat : string){
    
    this.seatSelectedFlag=true;
    //show snack bar on clicking empty seat
    if(!this.checkSeatBlocked(seat)){
      this._snackBar.open('Check another seat!', 'Seat is empty!', {
        duration: 4000,
      });
    }

    //on clicking occupied seat--->
    else{
    //getting passenger details
    this.passengerOfSeatSelected = this.passengers.find(x => ( (x.seatNo == seat) && (x.flightNo==this.flightNumber) ) );

    //getting ancillary service details
    this.passengerSelectedAncillaryServices = this.ancillaryServices.find(x => x.passportNumber == this.passengerOfSeatSelected.passportNumber);
    }
  }

  // Used for looping seats in HTML
  arrayN(n: number): number[] {
    return [...Array(n).keys()];
  }

  checkSeatBlocked(seat:string):boolean{
    if(this.blockedSeats.find(x => x === seat)!=null){
      return true;
    }
    else{
      return false;
    }
  }

  wheelchairOrInfant(seat : string):string{
    return this.passengerService.checkWheelchairOrInfant(seat,this.flightNumber);
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
}
