import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomerOrderConfirmationComponent } from "./c-o-c.component";

describe("CustomerOrderConfirmationComponent", () => {
  let component: CustomerOrderConfirmationComponent;
  let fixture: ComponentFixture<CustomerOrderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOrderConfirmationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
