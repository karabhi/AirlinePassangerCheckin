import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/model/flight.model';

@Component({
  selector: 'app-flight-item',
  templateUrl: './flight-item.component.html',
  styleUrls: ['./flight-item.component.scss']
})
export class FlightItemComponent implements OnInit {

  @Input() flight : Flight;
  //@Input() index : number;

  constructor() { }

  ngOnInit(): void {
  }

}
