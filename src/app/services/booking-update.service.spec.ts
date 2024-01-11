import { TestBed } from '@angular/core/testing';

import { BookingUpdateService } from './booking-update.service';

describe('BookingUpdateService', () => {
  let service: BookingUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
