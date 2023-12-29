import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { InventoryItem } from "src/app/interfaces/inventory-item";
import {
  ActOnInventoryItemRequestVM,
  InventoryItemRequest,
  InventoryItemRequestRawMaterial,
} from "src/app/interfaces/inventory-operation";
import { InventoryStoreItem } from "src/app/interfaces/inventory-store-item";
import { PackSize } from "src/app/interfaces/pack-size";
import { User } from "src/app/interfaces/user";
import { InventoryItemService } from "src/app/services/inventory-item.service";
import { InventoryOperationService } from "src/app/services/inventory-operation.service";
import { InventoryStoreItemService } from "src/app/services/inventory-store-item.service";
import { PackSizeService } from "src/app/services/pack-size.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-inventory-item-approval",
  templateUrl: "./inventory-item-approval.component.html",
  styleUrls: ["./inventory-item-approval.component.scss"],
})
export class InventoryItemApprovalComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  cautionForm: FormGroup;
  allPendingRequests: InventoryItemRequest[];
  selectedPendingRequests: InventoryItemRequest[];
  fetchingPendingRequests: boolean;
  pendingReqCols: any[];
  selectedItemRawMaterials: InventoryItemRequestRawMaterial[];
  rawMaterialCols: any[];
  allItems: InventoryItem[];
  allPackSizes: PackSize[];
  allUsers: User[];
  itemRequestInView: InventoryItemRequest;
  allStoreItems: InventoryStoreItem[];
  openCautionDialogue: boolean;
  cautionText: string;
  cautionCode: number;

  constructor(
    fb: FormBuilder,
    private inventoryItemService: InventoryItemService,
    private packSizeService: PackSizeService,
    private inventoryOperationService: InventoryOperationService,
    private inventoryStoreItemService: InventoryStoreItemService,
    private userService: UserService,
    public messageService: MessageService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService
  ) {
    this.cautionForm = fb.group({});
  }

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
      { field: "requestName", header: "Name" },
      { field: "requestDescription", header: "Description" },
      { field: "unitPrice", header: "Unit Price" },
      { field: "requestedQuantity", header: "Quantity" },
    ];

    this.rawMaterialCols = [
      { field: "name", header: "Name" },
      { field: "description", header: "Item Description" },
      { field: "quantity", header: "Description" },
      { field: "totalInStock", header: "BatchDescription" },
    ];

    this.FetchAllItems();
    this.FetchAllInventoryStoreItems();
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

        this.allItems = data.object;
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
        this.FetchAllUsers();
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

  FetchAllUsers() {
    this.userService.GetAllUserAccounts().subscribe(
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

        this.allUsers = data.object;
        this.allUsers.forEach(
          (x) => (x.fullname = x.lastname + " " + x.firstname)
        );
        this.FetchAllAwaitingApprovalItemRequest();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all users at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  FetchAllAwaitingApprovalItemRequest() {
    this.fetchingPendingRequests = true;
    this.inventoryOperationService
      .GetAllAwaitingApprovalInventoryItemRequests()
      .subscribe(
        async (data) => {
          if (!data.isSuccessful) {
            this.messageService.add({
              severity: "error",
              summary: "Failure",
              detail: data.message,
            });
            this.fetchingPendingRequests = false;
            console.log("Error: " + JSON.stringify(data));
            return;
          }

          this.allPendingRequests = data.object;
          this.fetchingPendingRequests = false;
        },
        (error) => {
          console.log("Error: " + JSON.stringify(error));
          this.messageService.add({
            severity: "error",
            summary: "Notice",
            detail:
              "Unable to get all awaiting approval requests at the moment.. Reason: [" +
              error.message +
              "]",
          });
          this.fetchingPendingRequests = false;
        }
      );
  }

  FetchAllInventoryStoreItems() {
    this.inventoryStoreItemService.GetAllInventoryItemsInStore().subscribe(
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

        this.allStoreItems = data.object;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all store items at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  ShowItemRequestDetails(item: InventoryItemRequest) {
    this.itemRequestInView = item;
    this.itemRequestInView.rawMaterials.forEach(
      (rawMaterial) =>
        (rawMaterial.quantityInStore = this.GetStoreItemQuantity(
          rawMaterial.rawMaterialId,
          rawMaterial.packSizeId
        ))
    );
  }

  ShowDeclineItemRequested() {
    this.cautionText =
      "Are you sure you want to decline this item request. This is an irreversible action. Do you still wish to proceed?";
    this.cautionCode = 0;
    this.openCautionDialogue = true;
  }

  ShowApproveItemRequested() {
    this.cautionText =
      "Are you sure you want to approve this item request. This is an irreversible action. Do you still wish to proceed?";
    this.cautionCode = 1;
    this.openCautionDialogue = true;
  }

  GetItemName(itemId: number): string {
    let item = this.allItems.find((x) => x.id == itemId);
    if (item) return item.name;

    return "N/A";
  }

  GetPackSizeCaption(packSizeId: number): string {
    let packSize = this.allPackSizes.find((x) => x.id == packSizeId);
    if (packSize) return packSize.caption;

    return "N/A";
  }

  GetUserName(userId): string {
    let officer = this.allUsers.find((x) => x.id == userId);
    if (officer) return officer.lastname + " " + officer.firstname;

    return "N/A";
  }

  GetStoreItemQuantity(itemId: number, packSizeId: number): number {
    let storeItem = this.allStoreItems.find(
      (x) => x.inventoryItemId == itemId && x.packSizeId == packSizeId
    );
    if (storeItem) return storeItem.quantityInStore;

    return 0;
  }

  CautionAction() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Performing Action On Item Request...",
    });

    const postData: ActOnInventoryItemRequestVM = {
      itemRequestId: this.itemRequestInView.id,
      isApproved: this.cautionCode == 1 ? true : false,
    };

    this.inventoryOperationService
      .ActOnInventoryItemRequest(postData)
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
            detail: "Action Successfull...",
          });

          this.fetchingPendingRequests = true;
          this.HideCautionDialog();
          const index = this.allPendingRequests.indexOf(this.itemRequestInView);
          if (index > -1) {
            this.allPendingRequests.splice(index, 1);
          }
          this.itemRequestInView = null;
          this.fetchingPendingRequests = false;
        },
        (error) => {
          console.log("Error: " + JSON.stringify(error));
          this.messageService.add({
            severity: "error",
            summary: "Notice",
            detail:
              "Unable to act on item request at the moment.. Reason: [" +
              error.message +
              "]",
          });
        }
      );
  }

  HideCautionDialog() {
    this.openCautionDialogue = false;
    this.cautionCode = null;
    this.cautionText = null;
  }
}
