import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../components/sideComponents/buses/bus.model';


@Injectable({
  providedIn: 'root',
})
export class BusService {
  
  private apiUrl = 'http://localhost:8080/api/buses'; 

  constructor(private http: HttpClient) {}

  getBusSeats(busNumber: string): Observable<any[]> {
    const url = `${this.apiUrl}/seats/${busNumber}`;
    return this.http.get<any[]>(url);
  }

  // Fetch all buses
  getAllBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }

  // Add a new bus
  addBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(this.apiUrl, bus);
  }

  // Update an existing bus
  updateBus(bus: Bus): Observable<Bus> {
    const url = `${this.apiUrl}/${bus.id}`;
    return this.http.put<Bus>(url, bus);
  }

  // Delete a bus
  deleteBus(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
