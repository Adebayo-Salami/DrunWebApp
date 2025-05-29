import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomerOrderApprovalComponent } from "./c-o-a.component";

describe("CustomerOrderApprovalComponent", () => {
  let component: CustomerOrderApprovalComponent;
  let fixture: ComponentFixture<CustomerOrderApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOrderApprovalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
