import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemApprovalComponent } from './inventory-item-approval.component';

describe('InventoryItemApprovalComponent', () => {
  let component: InventoryItemApprovalComponent;
  let fixture: ComponentFixture<InventoryItemApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
