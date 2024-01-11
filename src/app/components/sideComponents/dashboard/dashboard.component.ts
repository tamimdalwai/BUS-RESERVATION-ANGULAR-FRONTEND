import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { BusService } from 'src/app/services/bus.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalBookings: number = 0; // Example data, replace with actual data
  totalBuses: number = 0;
  totalRoutes: number = 0;
  totalCustomers: number = 0;
  totalEarning: number = 50000;

  constructor(private router: Router,
    private customerService: CustomerService,
    private bookingsService: BookingService,
    private busService: BusService,
    private routeService: RouteService,
    ) {}

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.totalCustomers = customers.length;
    });

    this.bookingsService.getAllBookings().subscribe(bookings => {
      this.totalBookings = bookings.length;
      // You might want to calculate the total earning based on booking data
      this.totalEarning = bookings.reduce((sum, booking) => sum + booking.amount, 0);
    });

    this.busService.getAllBuses().subscribe(buses => {
      this.totalBuses = buses.length;
    });

    this.routeService.getAllRoutes().subscribe(routes => {
      this.totalRoutes = routes.length;
    })
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}
