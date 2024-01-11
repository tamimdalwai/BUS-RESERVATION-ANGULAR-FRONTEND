import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerFormDialogComponent } from './add-customer-form-dialog.component';

describe('AddCustomerFormDialogComponent', () => {
  let component: AddCustomerFormDialogComponent;
  let fixture: ComponentFixture<AddCustomerFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
