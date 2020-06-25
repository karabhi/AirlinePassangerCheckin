import { Routes, RouterModule } from '@angular/router';
import { FlightsComponent } from './flights/flights.component';
import { NgModule } from '@angular/core';
import { PassengersComponent } from './passengers/passengers.component';

const appRoutes : Routes = [
    {path: '', redirectTo : '/flights', pathMatch:'full'},
    {path: 'flights', component : FlightsComponent},
    {path: 'passengers', component : PassengersComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule] 
 })
 export class AppRoutingModule{}