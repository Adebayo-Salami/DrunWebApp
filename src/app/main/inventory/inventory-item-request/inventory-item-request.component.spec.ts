import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemRequestComponent } from './inventory-item-request.component';

describe('InventoryItemRequestComponent', () => {
  let component: InventoryItemRequestComponent;
  let fixture: ComponentFixture<InventoryItemRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
