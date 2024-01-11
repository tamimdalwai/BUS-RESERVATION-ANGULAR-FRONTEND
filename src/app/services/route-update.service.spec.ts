import { TestBed } from '@angular/core/testing';

import { RouteUpdateService } from './route-update.service';

describe('RouteUpdateService', () => {
  let service: RouteUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
