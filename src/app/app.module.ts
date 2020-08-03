import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

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
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule, MatCheckboxChange} from '@angular/material/checkbox';
import { MatSelectModule } from "@angular/material/select";
import { CheckInComponent } from './passengers/check-in/check-in.component';
import { SeatMapComponent } from './flights/seat-map/seat-map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PassengerEditComponent } from './passengers/passenger-edit/passenger-edit.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlightsComponent,
    PassengersComponent,
    FlightItemComponent,
    CheckInComponent,
    SeatMapComponent,
    PageNotFoundComponent,
    PassengerEditComponent,
    LoginComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [FlightService,PassengerService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
