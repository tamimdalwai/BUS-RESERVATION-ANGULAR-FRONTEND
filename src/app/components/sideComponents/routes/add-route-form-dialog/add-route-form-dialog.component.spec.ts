import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRouteFormDialogComponent } from './add-route-form-dialog.component';

describe('AddRouteFormDialogComponent', () => {
  let component: AddRouteFormDialogComponent;
  let fixture: ComponentFixture<AddRouteFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRouteFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRouteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
