import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomERProductCategoryComponent } from './custom-erproduct-category.component';

describe('CustomERProductCategoryComponent', () => {
  let component: CustomERProductCategoryComponent;
  let fixture: ComponentFixture<CustomERProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomERProductCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomERProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
