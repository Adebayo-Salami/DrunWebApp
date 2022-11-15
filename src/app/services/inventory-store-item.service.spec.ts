import { TestBed } from '@angular/core/testing';

import { InventoryStoreItemService } from './inventory-store-item.service';

describe('InventoryStoreItemService', () => {
  let service: InventoryStoreItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryStoreItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
