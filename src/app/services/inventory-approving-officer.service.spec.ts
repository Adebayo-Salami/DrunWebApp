import { TestBed } from "@angular/core/testing";

import { InventoryApprovingOfficerService } from "./inventory-approving-officer.service";

describe("InventoryApprovingOfficerService", () => {
  let service: InventoryApprovingOfficerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryApprovingOfficerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
