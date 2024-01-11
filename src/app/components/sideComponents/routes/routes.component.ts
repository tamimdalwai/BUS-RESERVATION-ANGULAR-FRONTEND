// routes.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Route } from './route.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddRouteFormDialogComponent } from './add-route-form-dialog/add-route-form-dialog.component';
import { RouteService } from 'src/app/services/route.service';
import { RouteUpdateService } from 'src/app/services/route-update.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css'],
})
export class RoutesComponent implements OnInit {
  dataSource = new MatTableDataSource<Route>();
  addRouteForm: FormGroup;
  availableBuses: any[] = [];
  displayedColumns: string[] = ['id', 'departureFrom', 'departureTo','busNumber', 'departureDate', 'departureTime', 'cost', 'actions'];

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private routeService: RouteService,
    private routeUpdateService: RouteUpdateService,
    private busService: BusService 
  ) {
    this.addRouteForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      busNumber: ['', Validators.required],
      departureDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      cost: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.routeService.getAllRoutes().subscribe((routes: Route[]) => {
      console.log(routes);
      this.dataSource.data = routes;
    });

    this.routeUpdateService.routeUpdated.subscribe(() => {
      this.routeService.getAllRoutes().subscribe((routes: Route[]) => {
        this.dataSource.data = routes;
      });
    });


    this.busService.getAllBuses().subscribe((buses:any) => {
      this.availableBuses = buses;
      console.log(this.dataSource.data);
      
    });
    //this.dataSource.data.forEach((route) => (route.editMode = false));
  }

  saveRoute(route: Route): void {
    console.log(route);
    
    this.routeService.updateRoute(route.routeId,route).subscribe(
      (updatedRoute: Route) => {
        this.snackBar.open('Route updated successfully', 'Dismiss', {
          duration: 3000,
        });
        //route.editMode = false;
      },
      (error) => {
        console.error('Error updating route:', error);
        this.snackBar.open('Error updating route. Please try again.', 'Dismiss', {
          duration: 3000,
        });
      }
    );
  }

  onSubmit(): void {
    if (this.addRouteForm.valid) {
      const newRoute: Route = new Route(
        this.addRouteForm.value.route_id,
        this.addRouteForm.value.departureFrom,
        this.addRouteForm.value.departureTo,
        this.addRouteForm.value.bus,
        this.addRouteForm.value.departureDate,
        this.addRouteForm.value.departureTime,
        this.addRouteForm.value.cost,
        false
      );

      this.routeService.createRoute(newRoute).subscribe((createdRoute: Route) => {
        this.dataSource.data = [...this.dataSource.data, createdRoute];
        this.addRouteForm.reset();
      });
    }
  }

  deleteRoute(route: Route): void {
    this.routeService.deleteRoute(route.routeId).subscribe(() => {
      const index = this.dataSource.data.findIndex((r) => r.routeId === route.routeId);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
      this.snackBar.open('Route deleted successfully', 'Dismiss', {
        duration: 3000,
      });
    });
  }

  // Other methods...

  openAddRouteForm(): void {
    this.routeService.getAvailableBuses().subscribe((availableBuses: any) => {
      const dialogRef = this.dialog.open(AddRouteFormDialogComponent, {
        width: '400px',
        data: { availableBuses },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log(result);
          this.onSubmit();
        }
      });
    });
  }


  editRoute(route: Route): void {
    // Set the edit mode for the selected route
    this.routeUpdateService.routeUpdated.subscribe(() => {
      this.routeService.getAllRoutes().subscribe((routes: Route[]) => {
        this.dataSource.data = routes;
        console.log(this.dataSource.data);
        
      });
    });

    route.editMode = true;
  }
}
