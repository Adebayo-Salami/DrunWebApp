import { TestBed } from '@angular/core/testing';

import { PackSizeService } from './pack-size.service';

describe('PackSizeService', () => {
  let service: PackSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
