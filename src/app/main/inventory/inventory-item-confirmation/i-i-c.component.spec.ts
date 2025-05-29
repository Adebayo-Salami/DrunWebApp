import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InventoryItemConfirmationComponent } from "./i-i-c.component";

describe("InventoryItemConfirmationComponent", () => {
  let component: InventoryItemConfirmationComponent;
  let fixture: ComponentFixture<InventoryItemConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryItemConfirmationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
