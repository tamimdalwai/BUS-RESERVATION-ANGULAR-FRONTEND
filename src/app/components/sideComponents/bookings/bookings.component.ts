import { Component } from '@angular/core';
import { Booking } from './booking.model';
import { AddBookingFormComponent } from './add-booking-form/add-booking-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../customers/customer.model';
import { Route } from '../routes/route.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';
import { BookingUpdateService } from 'src/app/services/booking-update.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  dataSource = new MatTableDataSource<Booking>();
  addBookingForm: FormGroup;
  availableCustomers: Customer[] = [];
  availableRoutes: Route[] = [];
  displayedColumns: string[] = ['id', 'customer', 'route','bus', 'seatNumber', 'amount', 'bookingTime', 'actions'];

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private bookingService: BookingService,
    private bookingUpdateService:BookingUpdateService,
  ) {
    this.addBookingForm = this.fb.group({
      customer: [''],
      route: [''],
      seatNumber: [''],
      amount: [''],
      bookingTime: [new Date()],
      // Add other form controls as needed
    });
  }

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe((bookings: Booking[]) => {
      this.dataSource.data = bookings;
    });

    this.bookingUpdateService.bookingUpdated.subscribe(()=>{
      this.bookingService.getAllBookings().subscribe((bookings: Booking[]) => {
        this.dataSource.data = bookings;
      });
    })

    
    // Fetch available customers and routes using the BookingService
    this.bookingService.getAvailableCustomers().subscribe(customers => {
      this.availableCustomers = customers;
    });

    this.bookingService.getAvailableRoutes().subscribe(routes => {
      this.availableRoutes = routes;
    });
  }

  // onSubmit(): void {
  //   if (this.addBookingForm.valid) {
  //     this.addBookingForm.get('bookingTime')?.setValue(new Date());
  //     const newBooking: Booking = this.addBookingForm.value;

  //     let booking:Booking ={
  //       pnr: Math.round(Math.random() * 100000),
  //       amount: newBooking.amount,
  //       bookingTime: newBooking.bookingTime,
  //       customer: this.selectedCustomer,
  //       route:this.selectedRoute,
  //       seatNumber: newBooking.seatNumber
  //     };
      

  //     console.log(newBooking);
  //     // console.log(this.selectedCustomer);
  //     // console.log(this.selectedRoute);
            
  //     console.log(booking);
      
      
  //     this.bookingService.addBooking(booking).subscribe(
  //       (createdBooking: Booking) => {
  //         // Show success message
  //         this.snackBar.open('Booking created successfully', 'Dismiss', {
  //           duration: 3000,
  //         });

  //         console.log('New Booking Created:', createdBooking);
  //         this.dialogRef.close(createdBooking);
  //       },
  //       (error) => {
  //         // Handle error if needed
  //         console.error('Error creating booking:', error);
  //         this.snackBar.open('Error creating booking. Please try again.', 'Dismiss', {
  //           duration: 3000,
  //         });
  //       }
  //     );
  // }

  deleteBooking(booking: Booking): void {
    this.bookingService.deleteBooking(booking.pnr).subscribe(() => {
      const index = this.dataSource.data.findIndex((b) => b.pnr === booking.pnr);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
      this.snackBar.open('Booking deleted successfully', 'Dismiss', {
        duration: 3000,
      });
    });
  }

  openAddBookingForm(): void {
    const dialogRef = this.dialog.open(AddBookingFormComponent, {
      width: '400px',
      data: { availableCustomers: this.availableCustomers, availableRoutes: this.availableRoutes },
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        console.log(result);
       // this.onSubmit();
      }
    });
  }

  // Other methods...

  editBooking(booking: Booking): void {
    // Implement edit functionality if needed
  }
}
