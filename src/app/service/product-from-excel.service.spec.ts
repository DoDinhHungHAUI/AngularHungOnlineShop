import { TestBed } from '@angular/core/testing';

import { ProductFromExcelService } from './product-from-excel.service';

describe('ProductFromExcelService', () => {
  let service: ProductFromExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFromExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
