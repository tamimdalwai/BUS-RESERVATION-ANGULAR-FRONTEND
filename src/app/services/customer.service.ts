import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../components/sideComponents/customers/customer.model';
import { CustomerUpdateService } from './customer-update.service';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api'; // Replace with your actual API endpoint

  constructor(private http: HttpClient,private customerUpdateService:CustomerUpdateService) {}

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/customers`, customer).pipe(
      tap((createdCustomer: Customer) => {
        this.customerUpdateService.emitCustomerUpdate();
      })
    );
  }

  // createRoute(route: Route): Observable<Route> {
  //   return this.http.post<Route>(this.apiUrl, route).pipe(
  //     tap((createdRoute: Route) => {
  //       // After successfully creating a route, emit the route update event
  //       this.routeUpdateService.emitRouteUpdate();
  //     })
  //   );
  // }

  // Get all customers
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
  }

  // Get a single customer by ID
  getCustomerById(customerId: String): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/customers/${customerId}`);
  }

  // Update a customer
  updateCustomer(customerId: String, updatedCustomer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/customers/${customerId}`, updatedCustomer);
  }

  // Delete a customer
  deleteCustomer(customerId: String): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/customers/${customerId}`);
  }
}
