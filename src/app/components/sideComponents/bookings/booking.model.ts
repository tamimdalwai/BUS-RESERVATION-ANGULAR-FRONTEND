import { Customer } from "../customers/customer.model";
import { Route } from "../routes/route.model";

// booking.model.ts
export interface Booking {
    pnr: number;
    customer: Customer; // Assuming you have a Customer model
    route: Route; // Assuming you have a Route model
    seatNumber: string;
    amount: number;
    bookingTime: Date;
    // Add other properties as needed
  }
  