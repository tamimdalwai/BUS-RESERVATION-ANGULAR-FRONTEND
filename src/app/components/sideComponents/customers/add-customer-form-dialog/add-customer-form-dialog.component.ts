import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customer-form-dialog',
  templateUrl: './add-customer-form-dialog.component.html',
  styleUrls: ['./add-customer-form-dialog.component.css']
})
export class AddCustomerFormDialogComponent {
  addCustomerForm: FormGroup;
  

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddCustomerFormDialogComponent>,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.addCustomerForm = this.fb.group({
      customerId : ['',Validators.required],
      customerName: ['', Validators.required],
      contact: ['', [Validators.required,this.validateContact]],
    });
  }

  validateContact(control: AbstractControl): { [key: string]: any } | null {
    const contactValue = control.value;
    const isValid = /^\d{10}$/.test(contactValue);

    return isValid ? null : { invalidContact: true };
  }

  onSubmit(): void {
    if (this.addCustomerForm.valid) {
      
      const newCustomer: Customer = {
        customerId: this.addCustomerForm.value.customerId,
        customerName: this.addCustomerForm.value.customerName,
        contact: this.addCustomerForm.value.contact,
        editMode: false
      }
      console.log(newCustomer);
      
      this.customerService.createCustomer(newCustomer).subscribe(
        
       
        (createdCustomer: Customer) => {

          this.snackBar.open('Customer added successfully', 'Dismiss', {
            duration: 3000,
          });
  

          this.dialogRef.close(createdCustomer);
        },
        (error) => {
          // Handle error
          console.error('Error creating route:', error);
          this.snackBar.open('Error adding customer. Please try again.', 'Dismiss', {
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