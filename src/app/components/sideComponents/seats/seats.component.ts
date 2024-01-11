import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/services/bus.service';
import { Seat } from './seat.model';
import { ActivatedRoute } from '@angular/router';
import { SeatService } from 'src/app/services/seat.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  busNumber!: string;
  seatRows: Seat[][] = [];

  constructor(private seatService: SeatService) {}

  ngOnInit(): void {}

  searchSeats(): void {
    if (this.busNumber) {
      this.seatService.getSeatsByBusNumber(this.busNumber).subscribe((seats) => {
        this.arrangeSeats(seats);
      });
    }
  }

  arrangeSeats(seats: Seat[]): void {
    // Logic to arrange seats into rows
    // Assuming seats are ordered by seatNumber

    const firstRowSeats = seats.slice(0, 10);
    const secondRowSeats = seats.slice(10, 20);
    const fourthRowSeats = seats.slice(20, 29);
    const fifthRowSeats = seats.slice(29, 38);

    // Display the seats in rows
    this.seatRows = [firstRowSeats, secondRowSeats, fourthRowSeats, fifthRowSeats];
  }

  getSeatClass(seat: Seat): string {
    return `seat ${seat.reserved ? 'reserved' : 'available'}`;
  }

}
