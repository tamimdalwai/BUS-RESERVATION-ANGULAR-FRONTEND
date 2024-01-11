import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './components/sideComponents/dashboard/dashboard.component';
import { BusesComponent } from './components/sideComponents/buses/buses.component';
import { RoutesComponent } from './components/sideComponents/routes/routes.component';
import { CustomersComponent } from './components/sideComponents/customers/customers.component';
import { BookingsComponent } from './components/sideComponents/bookings/bookings.component';
import { SeatsComponent } from './components/sideComponents/seats/seats.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { AddRouteFormDialogComponent } from './components/sideComponents/routes/add-route-form-dialog/add-route-form-dialog.component';

import { MatNativeDateModule } from '@angular/material/core';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddCustomerFormDialogComponent } from './components/sideComponents/customers/add-customer-form-dialog/add-customer-form-dialog.component';
import { AddBookingFormComponent } from './components/sideComponents/bookings/add-booking-form/add-booking-form.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    BusesComponent,
    RoutesComponent,
    CustomersComponent,
    BookingsComponent,
    SeatsComponent,
    AddRouteFormDialogComponent,
    AddCustomerFormDialogComponent,
    AddBookingFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
