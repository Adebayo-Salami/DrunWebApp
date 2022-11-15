import { TestBed } from '@angular/core/testing';

import { InventoryOperationService } from './inventory-operation.service';

describe('InventoryOperationService', () => {
  let service: InventoryOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
