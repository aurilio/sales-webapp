import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDetailsPage } from './sale-details.page';

describe('SaleDetailsPage', () => {
  let component: SaleDetailsPage;
  let fixture: ComponentFixture<SaleDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
