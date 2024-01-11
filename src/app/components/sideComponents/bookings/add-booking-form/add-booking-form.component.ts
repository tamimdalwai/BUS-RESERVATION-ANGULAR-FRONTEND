import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from '../booking.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from '../../customers/customer.model';
import { Route } from '../../routes/route.model';
import { CustomerService } from 'src/app/services/customer.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-add-booking-form',
  templateUrl: './add-booking-form.component.html',
  styleUrls: ['./add-booking-form.component.css']
})
export class AddBookingFormComponent implements OnInit {
  addBookingForm: FormGroup;
  
  availableCustomers!: Customer[];
  availableRoutes!: Route[];
  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private bookingService: BookingService,
    public dialogRef: MatDialogRef<AddBookingFormComponent>,
    private customerService: CustomerService,
    private routeService: RouteService,
    @Inject(MAT_DIALOG_DATA) public data: { availableCustomers: any[]; availableRoutes: any[] }
  ) {

    // public departureFrom: string,
    // public departureTo: string,
    // public bus: {busNumber: number},
    // public departureDate: Date, // Updated property for date
    // public departureTime: string, // Updated property for time
    // public cost: number,
    // public editMode: boolean
    this.addBookingForm = this.fb.group({
      customer: ['', Validators.required],
      customerName: [''],
      contact: [''],
      route: ['', Validators.required],
      busNumber:[''],
      departureDate:[''],
      departureTime:[''],
      seatNumber: ['', Validators.required],
      amount: [''],
      bookingTime: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    // Additional initialization logic if needed
    this.seatNumbers = Array.from({ length: 38 }, (_, i) => i + 1); // Generate an array of numbers from 1 to 38
    this.bookingService.getAvailableCustomers().subscribe(customers => {
      this.availableCustomers = customers;
    });

    this.bookingService.getAvailableRoutes().subscribe(routes => {
      this.availableRoutes = routes;
    });
    //console.log(this.seatNumbers);
    
  }
  seatNumbers: number[] = Array.from({ length: 38 }, (_, i) => i + 1); // Generate an array of numbers from 1 to 38

  onSubmit(): void {
    if (this.addBookingForm.valid) {
      this.addBookingForm.get('bookingTime')?.setValue(new Date());
      const newBooking: Booking = this.addBookingForm.value;

      let booking:Booking ={
        pnr: Math.round(Math.random() * 100000),
        amount: newBooking.amount,
        bookingTime: newBooking.bookingTime,
        customer: this.selectedCustomer,
        route:this.selectedRoute,
        seatNumber: newBooking.seatNumber
      };
      

      console.log(newBooking);
      // console.log(this.selectedCustomer);
      // console.log(this.selectedRoute);
            
      console.log(booking);
      
      
      this.bookingService.addBooking(booking).subscribe(
        (createdBooking: Booking) => {
          // Show success message
          this.snackBar.open('Booking created successfully', 'Dismiss', {
            duration: 3000,
          });

          console.log('New Booking Created:', createdBooking);
          this.dialogRef.close(createdBooking);
        },
        (error) => {
          // Handle error if needed
          console.error('Error creating booking:', error);
          this.snackBar.open('Error creating booking. Please try again.', 'Dismiss', {
            duration: 3000,
          });
        }
      );
    }
  }

  selectedCustomer!: Customer;

  onCustomerSelected(): void {
    const selectedCustomerId = this.addBookingForm.get('customer')?.value;

    if (selectedCustomerId) {
      this.customerService.getCustomerById(selectedCustomerId).subscribe((customer) => {
        this.selectedCustomer = customer; // Assuming customerService returns the entire customer object
        this.addBookingForm.get('customerName')?.setValue(this.selectedCustomer.customerName);
        this.addBookingForm.get('contact')?.setValue(this.selectedCustomer.contact);
      });
    } else {
      // Reset the fields if no customer is selected
      this.addBookingForm.get('customerName')?.setValue('');
      this.addBookingForm.get('contact')?.setValue('');
    }
  }
  selectedRoute!:Route;
  onRouteSelected() :void{
    const selectedRoute = this.addBookingForm.get('route')?.value;
    if(selectedRoute){
      this.routeService.getRouteById(selectedRoute).subscribe((route)=>{
        this.selectedRoute = route;
        this.addBookingForm.get('busNumber')?.setValue(this.selectedRoute.bus.busNumber);
        this.addBookingForm.get('departureDate')?.setValue(this.selectedRoute.departureDate)
        this.addBookingForm.get('departureTime')?.setValue(this.selectedRoute.departureTime)
        this.addBookingForm.get('amount')?.setValue(this.selectedRoute.cost)
      })
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}