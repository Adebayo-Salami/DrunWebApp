import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomerOrderViewComponent } from "./c-o-v.component";

describe("CustomerOrderViewComponent", () => {
  let component: CustomerOrderViewComponent;
  let fixture: ComponentFixture<CustomerOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOrderViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
