import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleFiltersComponent } from './sale-filters.component';

describe('SaleFiltersComponent', () => {
  let component: SaleFiltersComponent;
  let fixture: ComponentFixture<SaleFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
