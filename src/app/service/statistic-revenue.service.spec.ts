import { TestBed } from '@angular/core/testing';

import { StatisticRevenueService } from './statistic-revenue.service';

describe('StatisticRevenueService', () => {
  let service: StatisticRevenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticRevenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
