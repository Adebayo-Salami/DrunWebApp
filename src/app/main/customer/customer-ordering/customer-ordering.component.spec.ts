import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderingComponent } from './customer-ordering.component';

describe('CustomerOrderingComponent', () => {
  let component: CustomerOrderingComponent;
  let fixture: ComponentFixture<CustomerOrderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
