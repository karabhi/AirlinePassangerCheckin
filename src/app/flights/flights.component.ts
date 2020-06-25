import { Component, OnInit } from '@angular/core';
import { Flight } from '../model/flight.model';
import { FlightService } from './flight.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  flights : Flight[];

  constructor(private flightService : FlightService,private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.flights = this.flightService.getFlights();
  }

}
