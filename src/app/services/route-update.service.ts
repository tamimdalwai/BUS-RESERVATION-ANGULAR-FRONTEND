import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteUpdateService {
// Create an EventEmitter to notify subscribers about route updates
routeUpdated: EventEmitter<void> = new EventEmitter<void>();

// Method to trigger the routeUpdated event
emitRouteUpdate(): void {
  this.routeUpdated.emit();
}
}
