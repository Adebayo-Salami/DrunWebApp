import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";

@Component({
  selector: "app-inventory-item-approval",
  templateUrl: "./inventory-item-approval.component.html",
  styleUrls: ["./inventory-item-approval.component.scss"],
})
export class InventoryItemApprovalComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  allPendingRequests: any[];
  selectedPendingRequests: any[];
  fetchingPendingRequests: boolean;
  pendingReqCols: any[];
  requestedItemRawMaterials: any[];
  selectedItemRawMaterials: any[];
  rawMaterialCols: any[];

  constructor(
    fb: FormBuilder,
    public messageService: MessageService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        label: "Inventory",
        routerLink: ["/main/inventory"],
      },
      {
        label: "Item Approval",
        routerLink: ["/main/inventory/item-approval"],
      },
    ]);

    this.pendingReqCols = [
      { field: "name", header: "Name" },
      { field: "description", header: "Description" },
      { field: "batchDescription", header: "BatchDescription" },
    ];

    this.rawMaterialCols = [
      { field: "name", header: "Name" },
      { field: "description", header: "Item Description" },
      { field: "quantity", header: "Description" },
      { field: "totalInStock", header: "BatchDescription" },
    ];
  }

  ShowDeclineItemRequested() {}

  ShowApproveItemRequested() {}
}
