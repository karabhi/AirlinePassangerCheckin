import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightService } from 'src/app/flights/flight.service';
import { Flight } from 'src/app/model/flight.model';
import { PassengerService } from '../passenger.service';
import { Passenger } from 'src/app/model/passenger.model';
import { AncillaryService } from 'src/app/model/ancillary-service.model';
import { Subscriber } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-passenger-edit',
  templateUrl: './passenger-edit.component.html',
  styleUrls: ['./passenger-edit.component.css']
})


export class PassengerEditComponent implements OnInit {

  constructor(private flightService : FlightService, 
              private passengerService : PassengerService,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  genders = ['MALE','FEMALE'];
  passengerForm : FormGroup;
  updateForm : FormGroup;
  flights : Flight[];
  flightIds  : String[];
  public passengerDeleteNumber : string;
  currentOperation : string;
  passengerUpdateNumber : string;
  passengerToUpdate : Passenger;
  ancillaryToUpdate : AncillaryService;

  ngOnInit(): void {

    this.flights = this.flightService.getFlights();
    this.currentOperation = this.route.snapshot.params['operation'];
    
    this.flightIds = [...this.flights.map(x => x.id)];

    this.passengerForm = new FormGroup({
      'passNo' : new FormControl(null,Validators.required),
      'name' : new FormControl(null, [Validators.required]),
      'age' : new FormControl(null, [Validators.required]),
      'gender' : new FormControl('MALE'),
      'flightNo' : new FormControl(null, [Validators.required]),
      
      'wheelchair' : new FormControl(false),
      'infant' : new FormControl(false),
      'ancillaryServices' : new FormControl(false),
      
      'meal' :  new FormControl(false),
      'luggage' : new FormControl(false),
      'legSpace' : new FormControl(false)
    })
  }

  onAddSubmit(){
    console.log(this.passengerForm);
    const formValues = this.passengerForm.value;
    const passengerInfo = new Passenger(
      formValues.passNo.toString(),
      formValues.name,
      formValues.age.toString(),
      formValues.gender,
      formValues.flightNo,
      formValues.wheelchair,
      formValues.infant,
      formValues.ancillaryServices,
      null);
    const passengerServiceInfo = new AncillaryService(
      formValues.passNo,
      formValues.meal,
      formValues.luggage,
      formValues.legSpace
    )

    this.passengerService.addPassenger(passengerInfo);
    this.passengerService.addPassengerServices(passengerServiceInfo);
    this.router.navigate(['/passengers']);
    console.log(this.passengerService.getPassengers());
  }

  deleteByPassNo(){
    this.passengerService.deletePassenger(this.passengerDeleteNumber);
    this.router.navigate(['/passengers']);
  }

  // getPassengerDetails(){
  //   if(this.passengerService.getPassenger(this.passengerUpdateNumber)){
  //     this.passengerToUpdate = this.passengerService.getPassenger(this.passengerUpdateNumber);
  //     //console.log(this.passengerToUpdate)
  //   }
  //   else{
  //     this._snackBar.open("Error!", "Enter proper passport number", {
  //       duration: 2000,
  //     });
  //   }

  //   if(this.passengerService.getAncillaryService(this.passengerUpdateNumber)){
  //     this.ancillaryToUpdate = this.passengerService.getAncillaryService(this.passengerUpdateNumber)
  //   }

  //   this.updateForm = new FormGroup({
  //     'passNo' : new FormControl(this.passengerToUpdate.passportNumber,Validators.required),
  //     'name' : new FormControl(this.passengerToUpdate.name, [Validators.required]),
  //     'age' : new FormControl(this.passengerToUpdate.age, [Validators.required]),
  //     'gender' : new FormControl(this.passengerToUpdate.gender),
  //     'flightNo' : new FormControl(this.passengerToUpdate.flightNo, [Validators.required]),
      
  //     'wheelchair' : new FormControl(this.passengerToUpdate.wheelChair),
  //     'infant' : new FormControl(this.passengerToUpdate.isInfant),
  //     'ancillaryServices' : new FormControl(this.passengerToUpdate.ancillaryServices),
      
  //     'meal' :  new FormControl(this.ancillaryToUpdate.specialMeal),
  //     'luggage' : new FormControl(this.ancillaryToUpdate.extraLuggage),
  //     'legSpace' : new FormControl(this.ancillaryToUpdate.extraLegSpace)
  //   })

  //   console.log(this.updateForm)
  // }

  onUpdateSubmit(){

  }
}
