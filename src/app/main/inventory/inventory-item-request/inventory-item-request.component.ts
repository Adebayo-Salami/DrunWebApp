import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { InventoryItem } from "src/app/interfaces/inventory-item";
import { InventoryItemRequest } from "src/app/interfaces/inventory-operation";
import { PackSize } from "src/app/interfaces/pack-size";
import { ProductSupplier } from "src/app/interfaces/supplier";
import { InventoryItemService } from "src/app/services/inventory-item.service";
import { InventoryOperationService } from "src/app/services/inventory-operation.service";
import { PackSizeService } from "src/app/services/pack-size.service";
import { SupplierService } from "src/app/services/supplier.service";

@Component({
  selector: "app-inventory-item-request",
  templateUrl: "./inventory-item-request.component.html",
  styleUrls: ["./inventory-item-request.component.scss"],
})
export class InventoryItemRequestComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  requestForm: FormGroup;
  allInventoryItems: InventoryItem[];
  theInventoryItem: any;
  selectedInventoryRawItems: any[] = [];
  allRawMaterials: any[];
  theRawMaterial: any;
  rawMaterialQuantity: number;
  selectedRawMaterials: any[];
  fetchingItemRequests: boolean;
  allItemRequested: InventoryItemRequest[];
  selectedItemRequests: any[];
  itemReqCols: any[];
  allPackSizes: PackSize[];
  thePackSize: PackSize;
  allSuppliers: ProductSupplier[];

  constructor(
    fb: FormBuilder,
    private inventoryItemService: InventoryItemService,
    private packSizeService: PackSizeService,
    private supplierService: SupplierService,
    private inventoryOperationService: InventoryOperationService,
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
      { field: "requestName", header: "Name" },
      { field: "requestDescription", header: "Description" },
      { field: "requestedItemId", header: "Requesting Item" },
      { field: "requestedPackSizeId", header: "Pack Size" },
      { field: "requestedQuantity", header: "Quantity" },
    ];

    this.FetchAllItems();
    this.FetchAllPackSizes();
    this.FetchAllSuppliers();
    this.FetchAllPendingRequests();
  }

  FetchAllItems() {
    this.inventoryItemService.GetAllInventoryItems().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          console.log("Error: " + JSON.stringify(data));
          return;
        }

        this.allInventoryItems = data.object;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all items at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  FetchAllPackSizes() {
    this.packSizeService.GetAllPackSizes().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          console.log("Error: " + JSON.stringify(data));
          return;
        }

        this.allPackSizes = data.object;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all pack sizes at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  FetchAllSuppliers() {
    this.supplierService.GetAllSupplier().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          console.log("Error: " + JSON.stringify(data));
          return;
        }
        this.allSuppliers = data.object;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all suppliers at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  FetchAllPendingRequests() {
    this.fetchingItemRequests = true;
    this.inventoryOperationService
      .GetAllPendingInventoryItemRequests()
      .subscribe(
        async (data) => {
          if (!data.isSuccessful) {
            this.messageService.add({
              severity: "error",
              summary: "Failure",
              detail: data.message,
            });
            this.fetchingItemRequests = false;
            console.log("Error: " + JSON.stringify(data));
            return;
          }

          this.allItemRequested = data.object;
          this.fetchingItemRequests = false;
        },
        (error) => {
          console.log("Error: " + JSON.stringify(error));
          this.messageService.add({
            severity: "error",
            summary: "Notice",
            detail:
              "Unable to get all pack sizes at the moment.. Reason: [" +
              error.message +
              "]",
          });
          this.fetchingItemRequests = false;
        }
      );
  }

  CreateInventoryRequest() {}

  AddRawMaterial() {}

  RemoveRawMaterial(item: any) {}

  EditItemRequest(item: any) {}

  DeleteItemRequest(item: any) {}

  GetItemName(itemId: number): string {
    let item = this.allInventoryItems.find((x) => x.id == itemId);
    if (item) return item.name;

    return "N/A";
  }

  GetPackSizeCaption(packSizeId: number): string {
    let packSize = this.allPackSizes.find((x) => x.id == packSizeId);
    if (packSize) return packSize.caption;

    return "N/A";
  }
}
