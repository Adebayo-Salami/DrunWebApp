import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";

@Component({
  selector: "app-inventory-item-request",
  templateUrl: "./inventory-item-request.component.html",
  styleUrls: ["./inventory-item-request.component.scss"],
})
export class InventoryItemRequestComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  requestForm: FormGroup;
  allInventoryItems: any[];
  theInventoryItem: any;
  selectedInventoryRawItems: any[] = [];
  allRawMaterials: any[];
  theRawMaterial: any;
  rawMaterialQuantity: number;
  selectedRawMaterials: any[];
  fetchingItemRequests: boolean;
  allItemRequested: any[];
  selectedItemRequests: any[];
  itemReqCols: any[];
  allPackSizes: any[];
  thePackSize: any;

  constructor(
    fb: FormBuilder,
    public messageService: MessageService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService
  ) {
    this.requestForm = fb.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      Quantity: ["", Validators.required],
      Item: ["", Validators.required],
      PackSize: ["", Validators.required],
      BasePrice: [""],
      RawMaterial: [""],
      QtyRawMaterial: [""],
    });
  }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        label: "Inventory",
        routerLink: ["/main/inventory"],
      },
      {
        label: "Item Request",
        routerLink: ["/main/inventory/item-request"],
      },
    ]);

    this.itemReqCols = [
      { field: "name", header: "Name" },
      { field: "description", header: "Description" },
      { field: "requestingItem", header: "Requesting Item" },
      { field: "requestedPackize", header: "Pack Size" },
      { field: "quantiity", header: "Quantity" },
    ];
  }

  // Check User Reuuesyt
  //INCLUDE INVENTORY CONFIRMATION IN
  CreateInventoryRequest() {}

  AddRawMaterial() {}

  RemoveRawMaterial(item: any) {}

  EditItemRequest(item: any) {}

  DeleteItemRequest(item: any) {}
}
