import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderUserComponent } from './report-order-user.component';

describe('ReportOrderUserComponent', () => {
  let component: ReportOrderUserComponent;
  let fixture: ComponentFixture<ReportOrderUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOrderUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOrderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
