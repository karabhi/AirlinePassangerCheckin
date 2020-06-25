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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlightsComponent,
    PassengersComponent,
    FlightItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
