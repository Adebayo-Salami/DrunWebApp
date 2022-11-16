import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { InventoryItem } from "src/app/interfaces/inventory-item";
import {
  CreateInventoryItemRequestVM,
  InventoryItemRequest,
  UpdateInventoryItemRequestVM,
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
    PackSizeId: number;
    Quantity: number;
  }[] = [];
  fetchingItemRequests: boolean;
  allItemRequested: InventoryItemRequest[];
  selectedItemRequests: any[];
  itemReqCols: any[];
  allPackSizes: PackSize[];
  thePackSize: PackSize;
  allSuppliers: ProductSupplier[];
  theSupplier: ProductSupplier;
  editingItemRequest: boolean;
  itemRequestToEdit: InventoryItemRequest;
  theRawMaterialPackSize: PackSize;

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
      BasePrice: ["", Validators.required],
      RawMaterial: [""],
      RawMaterialPackSize: [""],
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
    this.FetchAllSuppliers();
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
        this.FetchAllPackSizes();
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
        this.FetchAllPendingRequests();
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
              "Unable to get all ppending requests at the moment.. Reason: [" +
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
        packSizeId: rawMaterial.PackSizeId,
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
          this.selectedRawMaterials = [];
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

  AddRawMaterial() {
    let alreadyExists = this.selectedRawMaterials.find(
      (x) => x.ItemId == this.theRawMaterial.id
    );
    if (alreadyExists) {
      this.messageService.add({
        severity: "error",
        summary: "Failure",
        detail: "Raw Material has already been added",
      });
      return;
    }

    if (this.theRawMaterial.id == this.theInventoryItem.id) {
      this.messageService.add({
        severity: "error",
        summary: "Failure",
        detail: "Raw Material can't be same as requesting item",
      });
      return;
    }

    this.selectedRawMaterials.push({
      ItemId: this.theRawMaterial.id,
      PackSizeId: this.theRawMaterialPackSize.id,
      Quantity: this.rawMaterialQuantity,
    });

    this.theRawMaterial = null;
    this.rawMaterialQuantity = null;
    this.theRawMaterialPackSize = null;
  }

  RemoveRawMaterial(item: {
    ItemId: number;
    PackSizeId: number;
    Quantity: number;
  }) {
    const index = this.selectedRawMaterials.indexOf(item);
    if (index > -1) {
      this.selectedRawMaterials.splice(index, 1);
    }
  }

  CloseEditingItemRequest() {
    this.theInventoryItem = null;
    this.thePackSize = null;
    this.theSupplier = null;
    this.selectedRawMaterials = [];
    this.itemRequestToEdit = null;
    this.theRawMaterial = null;
    this.rawMaterialQuantity = null;
    this.theRawMaterialPackSize = null;
    this.editingItemRequest = false;
    this.requestForm.reset();
  }

  EditItemRequest(item: InventoryItemRequest) {
    this.editingItemRequest = true;
    this.requestForm.addControl(
      "ID",
      new FormControl({ value: "", disabled: true }, Validators.required)
    );

    this.itemRequestToEdit = item;
    this.requestForm.patchValue({
      ID: item.id,
      Name: item.requestName,
      Description: item.requestDescription,
      Quantity: item.requestedQuantity,
      BasePrice: item.unitPrice,
    });
    this.theInventoryItem = this.allInventoryItems.find(
      (x) => x.id == item.requestedItemId
    );
    this.thePackSize = this.allPackSizes.find(
      (x) => x.id == item.requestedPackSizeId
    );
    this.theSupplier = this.allSuppliers.find(
      (x) => x.id == item.productSupplierId
    );
    this.selectedRawMaterials = [];
    item.rawMaterials.forEach((rawMaterial) => {
      this.selectedRawMaterials.push({
        ItemId: rawMaterial.rawMaterialId,
        PackSizeId: rawMaterial.packSizeId,
        Quantity: rawMaterial.quantity,
      });
    });

    this.formWrapper.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  }

  UpdateItemRequest() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Updating Inventory Item Request...",
    });

    const id = this.itemRequestToEdit.id;
    const postData: UpdateInventoryItemRequestVM = {
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
        packSizeId: rawMaterial.PackSizeId,
        quantity: rawMaterial.Quantity,
      });
    });

    this.inventoryOperationService
      .UpdateInventoryItemRequest(id, postData)
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
            summary: "Notice",
            detail: "Update Successful!",
          });
          this.CloseEditingItemRequest();
          this.FetchAllPendingRequests();
        },
        (error) => {
          console.log("Error: " + JSON.stringify(error));
          this.messageService.add({
            severity: "error",
            summary: "Notice",
            detail:
              "Unable to update inventory item request at the moment.. Reason: [" +
              error.message +
              "]",
          });
        }
      );
  }

  SendForApproval(item: InventoryItemRequest) {
    this.confirmationService.confirm({
      message:
        "Once an item request is sent for approval, it can't be modified again.Do you still wish to proceed?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Send item Request For Approval...",
        });

        this.inventoryOperationService
          .SendInventoryItemRequestForApproval(item.id)
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
                summary: "Removed",
                detail: "Successfully sent for approval",
              });

              this.fetchingItemRequests = true;
              this.CloseEditingItemRequest();
              const index = this.allItemRequested.indexOf(item);
              if (index > -1) {
                this.allItemRequested.splice(index, 1);
              }
              this.fetchingItemRequests = false;
            },
            (error) => {
              console.log("Error: " + JSON.stringify(error));
              this.messageService.add({
                severity: "error",
                summary: "Notice",
                detail:
                  "Unable to send item request for approval at the moment.. Reason: [" +
                  error.message +
                  "]",
              });
            }
          );
      },
    });
  }

  DeleteItemRequest(item: InventoryItemRequest) {
    this.confirmationService.confirm({
      message: "Are you sure you want to remove item request?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Removing item request...",
        });

        this.inventoryOperationService
          .DeleteInventoryItemRequest(item.id)
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
                summary: "Removed",
                detail: "Removed successfully",
              });

              this.fetchingItemRequests = true;
              this.CloseEditingItemRequest();
              const index = this.allItemRequested.indexOf(item);
              if (index > -1) {
                this.allItemRequested.splice(index, 1);
              }
              this.fetchingItemRequests = false;
            },
            (error) => {
              console.log("Error: " + JSON.stringify(error));
              this.messageService.add({
                severity: "error",
                summary: "Notice",
                detail:
                  "Unable to remove item request at the moment.. Reason: [" +
                  error.message +
                  "]",
              });
            }
          );
      },
    });
  }

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
