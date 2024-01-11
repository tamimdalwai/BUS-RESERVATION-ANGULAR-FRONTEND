import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Booking } from '../components/sideComponents/bookings/booking.model';
import { Customer } from '../components/sideComponents/customers/customer.model';
import { Route } from '../components/sideComponents/routes/route.model';
import { BookingUpdateService } from './booking-update.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  
  private apiUrl = 'http://localhost:8080/api'; // Replace with your actual API endpoint

  constructor(
    private http: HttpClient,
    private bookingUpdateService: BookingUpdateService
  ) {}

  getAllBookings() {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, booking).pipe(
      tap((createdBooking: Booking) => {
        this.bookingUpdateService.emitBookingUpdate();
      })
    );
  }

  getAvailableCustomers(): Observable<any[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
  }

  // Add method to fetch available routes
  getAvailableRoutes(): Observable<any[]> {
    return this.http.get<Route[]>(`${this.apiUrl}/routes`);
  }

  deleteBooking(pnr: number) {
    return this.http.delete<void>(`${this.apiUrl}/bookings/${pnr}`);
  }
}
