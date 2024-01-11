import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seat } from '../components/sideComponents/seats/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiUrl = 'http://localhost:8080/api/seats';

  constructor(private http: HttpClient) {}

  getSeatsByBusNumber(busNumber: string): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/${busNumber}`);
  }
}
