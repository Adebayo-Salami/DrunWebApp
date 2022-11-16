import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { InventoryItem } from "src/app/interfaces/inventory-item";
import {
  CreateInventoryItemRequestVM,
  InventoryItemRequest,
} from "src/app/interfaces/inventory-operation";
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
  theInventoryItem: InventoryItem;
  selectedInventoryRawItems: InventoryItem[] = [];
  allRawMaterials: InventoryItem[];
  theRawMaterial: InventoryItem;
  rawMaterialQuantity: number;
  selectedRawMaterials: {
    ItemId: number;
    Quantity: number;
  }[];
  fetchingItemRequests: boolean;
  allItemRequested: InventoryItemRequest[];
  selectedItemRequests: any[];
  itemReqCols: any[];
  allPackSizes: PackSize[];
  thePackSize: PackSize;
  allSuppliers: ProductSupplier[];
  theSupplier: ProductSupplier;

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
      Supplier: ["", Validators.required],
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
        this.allRawMaterials = this.allInventoryItems.filter(
          (x) => x.itemType == 1
        );
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

  CreateInventoryRequest() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Creating Item Request...",
    });

    const postData: CreateInventoryItemRequestVM = {
      requestName: this.requestForm.get("Name").value,
      requestDescription: this.requestForm.get("Description").value,
      requestedItemId: this.theInventoryItem.id,
      requestedPackSizeId: this.thePackSize.id,
      requestedQuantity: this.requestForm.get("Quantity").value,
      unitPrice: this.requestForm.get("BasePrice").value,
      productSupplierId: this.theSupplier.id,
      rawMaterials: [],
    };

    this.selectedRawMaterials.forEach((rawMaterial) => {
      postData.rawMaterials.push({
        itemId: rawMaterial.ItemId,
        quantity: rawMaterial.Quantity,
      });
    });

    this.inventoryOperationService
      .CreateInventoryItemRequest(postData)
      .subscribe(
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

          this.messageService.add({
            severity: "success",
            summary: "Completed",
            detail: "Inventory Item Request Created Successfully...",
          });

          this.theInventoryItem = null;
          this.thePackSize = null;
          this.theSupplier = null;
          this.selectedInventoryRawItems = [];
          this.requestForm.reset();
          this.FetchAllPendingRequests();
        },
        (error) => {
          console.log("Error: " + JSON.stringify(error));
          this.messageService.add({
            severity: "error",
            summary: "Notice",
            detail:
              "Unable to create item request at the moment.. Reason: [" +
              error.message +
              "]",
          });
        }
      );
  }

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
