import { Routes, RouterModule } from '@angular/router';
import { FlightsComponent } from './flights/flights.component';
import { NgModule } from '@angular/core';
import { PassengersComponent } from './passengers/passengers.component';
import { CheckInComponent } from './passengers/check-in/check-in.component';
import { SeatMapComponent } from './flights/seat-map/seat-map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PassengerEditComponent } from './passengers/passenger-edit/passenger-edit.component';
import { LoginComponent } from './login/login.component';

const appRoutes : Routes = [
    {path: '', redirectTo : '/flights', pathMatch:'full'},
    {path: 'flights', component : FlightsComponent},
    {path: 'flights/seatmap/:id', component : SeatMapComponent},
    {path: 'passengers', component : PassengersComponent},
    {path: 'passengers/edit/:operation', component : PassengerEditComponent},
    {path: 'passengers/checkin/:id', component : CheckInComponent},
    {path: 'login',component : LoginComponent},
    {path: '404', component:PageNotFoundComponent},
    {path: '**', redirectTo:'/404',pathMatch:'full'}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule] 
 })
 export class AppRoutingModule{}