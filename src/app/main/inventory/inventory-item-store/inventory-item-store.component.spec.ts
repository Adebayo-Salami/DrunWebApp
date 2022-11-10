import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemStoreComponent } from './inventory-item-store.component';

describe('InventoryItemStoreComponent', () => {
  let component: InventoryItemStoreComponent;
  let fixture: ComponentFixture<InventoryItemStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
