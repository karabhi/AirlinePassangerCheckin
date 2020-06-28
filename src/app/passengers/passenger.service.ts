import { Injectable, ViewChild } from "@angular/core";
import { Passenger } from '../model/passenger.model';
import { Subject } from 'rxjs';


// const passengers2 : Passenger[] = [
//     {passportNumber: '344416785', name : 'test', age : '33', gender: 'FEMALE', checkedIn: true, isInfant : false, wheelChair: true, ancillaryServices:false} 
// ]

@Injectable()
export class PassengerService{
    
    passengersChanged = new Subject<Passenger[]>();
    //startedEditing = new Subject<number>();
    
    private passengers = [
        new Passenger('544726664','Albert Einstein','42','MALE','MT-6713',false,false,true),
        new Passenger('736388945','Satyendra Nath Bose','62','MALE','MT-2915',false,true,true),
        new Passenger('897151781','Marie Curie','31','FEMALE','MT-4800',false,false,true),
        new Passenger('897178723','Nicolas Tesla','53','MALE','MT-6713',false,false,false),
        new Passenger('987854571','Richard Feynman','47','MALE','MT-4800',false,false,true),
        new Passenger('210828528','Rosalind Franklin','55','FEMALE','MT-2915',false,true,false),
        new Passenger('116657556','Ada Lovelace','28','FEMALE','MT-4800',false,false,true),
        new Passenger('629977025','Erwin Schrödinger','38','MALE','MT-6713',false,false,false),
        new Passenger('344416781','Mary Anning','45','FEMALE','MT-2915',false,false,true),
        new Passenger('905455962','Prafulla Chandra Ray','62','MALE','MT-6713',false,true,false)
    ];

    getPassengers(){
        return this.passengers.slice();
    }

}