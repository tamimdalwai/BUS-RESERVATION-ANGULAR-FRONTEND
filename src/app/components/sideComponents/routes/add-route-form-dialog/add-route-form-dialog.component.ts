// add-route-form-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RouteService } from 'src/app/services/route.service';
import { Route } from '../route.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-route-form-dialog',
  templateUrl: './add-route-form-dialog.component.html',
})
export class AddRouteFormDialogComponent implements OnInit {
  addRouteForm: FormGroup;
  availableBuses: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private routeService: RouteService,
    public dialogRef: MatDialogRef<AddRouteFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { availableBuses: any[]; editMode: boolean; routeData?: Route }
  ) {
    this.addRouteForm = this.fb.group({
      id: [''],
      from: [''],
      to: [''],
      busNumber: [''],
      departureDate: [''],
      departureTime: [''],
      cost: [''],
    });
    this.availableBuses = data.availableBuses;
  }

  ngOnInit(): void {
    console.log(this.data.routeData);
    
    if (this.data.editMode && this.data.routeData) {
      // If in edit mode and routeData is defined, update the form with the data passed from the parent
      this.addRouteForm.patchValue({
        id: this.data.routeData.routeId,
        from: this.data.routeData.departureFrom,
        to: this.data.routeData.departureTo,
        busNumber: this.data.routeData.bus?.busNumber,
        departureDate: this.data.routeData.departureDate.toISOString().split('T')[0], // Convert to string
        departureTime: this.data.routeData.departureTime,
        cost: this.data.routeData.cost,
      });
    }
  }
  

  onSubmit(): void {
    if (this.addRouteForm.valid) {
      const newRoute: Route = {
        routeId: this.addRouteForm.value.id,
        departureFrom: this.addRouteForm.value.from,
        departureTo: this.addRouteForm.value.to,
        bus: { busNumber: this.addRouteForm.value.busNumber },
        departureDate: new Date(this.addRouteForm.value.departureDate), // Convert to Date
        departureTime: this.addRouteForm.value.departureTime,
        cost: this.addRouteForm.value.cost,
        editMode: false
      };

      this.routeService.createRoute(newRoute).subscribe(
        (createdRoute: Route) => {
          // Show success message
          this.snackBar.open('Route created successfully', 'Dismiss', {
            duration: 3000,
          });

          console.log('New Route Created:', createdRoute);
          this.dialogRef.close(createdRoute);
        },
        (error) => {
          // Handle error if needed
          console.error('Error creating route:', error);
          this.snackBar.open('Error creating route. Please try again.', 'Dismiss', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
