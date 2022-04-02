import { TestBed } from '@angular/core/testing';

import { ReportOrderUserService } from './report-order-user.service';

describe('ReportOrderUserService', () => {
  let service: ReportOrderUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportOrderUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
