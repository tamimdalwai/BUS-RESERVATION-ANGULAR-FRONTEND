import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Route } from '../components/sideComponents/routes/route.model';
import { BusService } from './bus.service';
import { Bus } from '../components/sideComponents/buses/bus.model';
import { RouteUpdateService } from './route-update.service';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private apiUrl = 'http://localhost:8080/api/routes';

  constructor(private http: HttpClient, private busService: BusService,private routeUpdateService:RouteUpdateService) {}

  getAllRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.apiUrl);
  }

  getRouteById(id: number): Observable<Route> {
    return this.http.get<Route>(`${this.apiUrl}/${id}`);
  }

  createRoute(route: Route): Observable<Route> {
    return this.http.post<Route>(this.apiUrl, route).pipe(
      tap((createdRoute: Route) => {
        // After successfully creating a route, emit the route update event
        this.routeUpdateService.emitRouteUpdate();
      })
    );
  }
  

  // createRoute(route: Route): Observable<Route> {
  //   console.log(route);
    
  //   return this.http.post<Route>(this.apiUrl, route);
  // }

  updateRoute(id: number, route: Route): Observable<Route> {
    return this.http.put<Route>(`${this.apiUrl}/${id}`, route);
  }

  deleteRoute(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAvailableBuses(): Observable<Bus[]> {
    return this.busService.getAllBuses();
  }
}