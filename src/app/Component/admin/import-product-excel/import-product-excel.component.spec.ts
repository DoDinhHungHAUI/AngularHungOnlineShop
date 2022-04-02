import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProductExcelComponent } from './import-product-excel.component';

describe('ImportProductExcelComponent', () => {
  let component: ImportProductExcelComponent;
  let fixture: ComponentFixture<ImportProductExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportProductExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportProductExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
