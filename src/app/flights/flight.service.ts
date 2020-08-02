import { Injectable } from '@angular/core';
import { Flight } from '../model/flight.model';

@Injectable()
export class FlightService{

private flights : Flight[] = [
    new Flight(
        'MT-6713',
        'CCU',
        '12:00',
        '../../../assets/flight1.jpg'
    ),
    new Flight(
        'MT-2915',
        'BLR',
        '18:00',
        '../../../assets/flight2.jpg'
    ),
    new Flight(
        'MT-4800',
        'BOM',
        '22:00',
        '../../../assets/flight3.jpg'
    )
]

getFlights(){
    return this.flights.slice();
}

}