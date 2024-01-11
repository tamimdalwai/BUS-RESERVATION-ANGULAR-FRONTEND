export interface Seat {
    seatId: number;
    bus: {busNumber: number},
    seatNumber: string;
    reserved: boolean;
    status: string;
  }