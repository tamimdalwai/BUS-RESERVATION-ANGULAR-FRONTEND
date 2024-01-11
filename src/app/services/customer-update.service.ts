// customer-update.service.ts
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerUpdateService {
  // Create an EventEmitter to notify subscribers about customer updates
  customerUpdated: EventEmitter<void> = new EventEmitter<void>();

  // Method to trigger the customerUpdated event
  emitCustomerUpdate(): void {
    this.customerUpdated.emit();
  }
}
