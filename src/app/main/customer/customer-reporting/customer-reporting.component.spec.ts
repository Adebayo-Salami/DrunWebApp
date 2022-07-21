import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReportingComponent } from './customer-reporting.component';

describe('CustomerReportingComponent', () => {
  let component: CustomerReportingComponent;
  let fixture: ComponentFixture<CustomerReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
