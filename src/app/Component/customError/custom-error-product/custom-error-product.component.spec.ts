import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomErrorProductComponent } from './custom-error-product.component';

describe('CustomErrorProductComponent', () => {
  let component: CustomErrorProductComponent;
  let fixture: ComponentFixture<CustomErrorProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomErrorProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomErrorProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
