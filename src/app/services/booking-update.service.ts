import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingUpdateService {
  bookingUpdated: EventEmitter<void> = new EventEmitter<void>();

  // Method to trigger the customerUpdated event
  emitBookingUpdate(): void {
    this.bookingUpdated.emit();
  }
}
