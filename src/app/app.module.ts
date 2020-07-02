import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightsComponent } from './flights/flights.component';
import { PassengersComponent } from './passengers/passengers.component';
import { AppRoutingModule } from './app-routing.module';
import { FlightItemComponent } from './flights/flight-item/flight-item.component';
import { FlightService } from './flights/flight.service';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { PassengerService } from './passengers/passenger.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import { CheckInComponent } from './passengers/check-in/check-in.component';
import { SeatMapComponent } from './flights/seat-map/seat-map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlightsComponent,
    PassengersComponent,
    FlightItemComponent,
    CheckInComponent,
    SeatMapComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatCardModule
  ],
  providers: [FlightService,PassengerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
