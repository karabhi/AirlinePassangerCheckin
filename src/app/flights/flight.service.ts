import { Injectable } from '@angular/core';
import { Flight } from '../model/flight.model';

@Injectable()
export class FlightService{

private flights : Flight[] = [
    new Flight(
        'MT-6713',
        'CCU',
        '12:00',
        'https://upload.wikimedia.org/wikipedia/commons/0/09/A6-EDY_A380_Emirates_31_jan_2013_jfk_%288442269364%29_%28cropped%29.jpg'
    ),
    new Flight(
        'MT-2915',
        'BLR',
        '18:00',
        'https://upload.wikimedia.org/wikipedia/commons/3/31/Icelandair_Boeing_757-200_Wedelstaedt.jpg'
    ),
    new Flight(
        'MT-4800',
        'BOM',
        '10:00',
        'https://upload.wikimedia.org/wikipedia/commons/d/df/Douglas_DC-3%2C_SE-CFP.jpg'
    )
]

getFlights(){
    return this.flights.slice();
}

}