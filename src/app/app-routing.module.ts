import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/sideComponents/dashboard/dashboard.component';
import { BusesComponent } from './components/sideComponents/buses/buses.component';
import { RoutesComponent } from './components/sideComponents/routes/routes.component';
import { CustomersComponent } from './components/sideComponents/customers/customers.component';
import { BookingsComponent } from './components/sideComponents/bookings/bookings.component';
import { SeatsComponent } from './components/sideComponents/seats/seats.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'buses',
    component: BusesComponent,
  },
  {
    path: 'routes',
    component: RoutesComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'bookings',
    component: BookingsComponent,
  },
  {
    path: 'seats',
    component: SeatsComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
