import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Bus } from './bus.model';
import { BusService } from 'src/app/services/bus.service';


@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css'],
})
export class BusesComponent implements OnInit {
  dataSource = new MatTableDataSource<Bus>();
  addBusForm: FormGroup;

  displayedColumns: string[] = ['busNumber', 'actions'];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private busService: BusService 
  ) {
    this.addBusForm = this.fb.group({
      busNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Fetch all buses when the component initializes
    this.fetchBuses();

  }

  // Fetch all buses
  fetchBuses(): void {
    this.busService.getAllBuses().subscribe((buses:any) => {
      this.dataSource.data = buses;
      console.log(this.dataSource.data);
      
    });
  }

  // onSubmit(): void {
  //   if (this.addBusForm.valid) {
  //     const newBus: Bus = new Bus(this.generateUniqueId(), this.addBusForm.value.busNumber);
  //     // Use data property to update MatTableDataSource
  //     this.dataSource.data = [...this.dataSource.data, newBus];
  //     this.addBusForm.reset();
  //   }
  // }

  // Update onSubmit to add a bus using the service
  onSubmit(): void {
    if (this.addBusForm.valid) {
      const newBus: Bus = new Bus(this.addBusForm.value.id, this.addBusForm.value.busNumber); // id is undefined for a new bus
      this.busService.addBus(newBus).subscribe((addedBus:Bus) => {
        this.dataSource.data = [...this.dataSource.data, addedBus];
        this.addBusForm.reset();
      });
    }
  }

  private generateUniqueId(): number {
    // Replace this with your logic to generate a unique ID (e.g., using a service)
    return Math.floor(Math.random() * 1000);
  }

  // Update deleteBus to use the service
  deleteBus(bus: Bus): void {
    this.busService.deleteBus(bus.busNumber).subscribe(() => {
      const index = this.dataSource.data.findIndex(b => b.id === bus.id);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data]; // Trigger data update
      }
    });
  }
}
