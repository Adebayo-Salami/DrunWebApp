import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { InventoryItem } from "src/app/interfaces/inventory-item";
import { InventoryItemRequest } from "src/app/interfaces/inventory-operation";
import { PackSize } from "src/app/interfaces/pack-size";
import { User } from "src/app/interfaces/user";
import { InventoryItemService } from "src/app/services/inventory-item.service";
import { InventoryOperationService } from "src/app/services/inventory-operation.service";
import { PackSizeService } from "src/app/services/pack-size.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-inventory-item-approval",
  templateUrl: "./inventory-item-approval.component.html",
  styleUrls: ["./inventory-item-approval.component.scss"],
})
export class InventoryItemApprovalComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  allPendingRequests: InventoryItemRequest[];
  selectedPendingRequests: InventoryItemRequest[];
  fetchingPendingRequests: boolean;
  pendingReqCols: any[];
  requestedItemRawMaterials: any[];
  selectedItemRawMaterials: any[];
  rawMaterialCols: any[];
  allItems: InventoryItem[];
  allPackSizes: PackSize[];
  allUsers: User[];

  constructor(
    fb: FormBuilder,
    private inventoryItemService: InventoryItemService,
    private packSizeService: PackSizeService,
    private inventoryOperationService: InventoryOperationService,
    private userService: UserService,
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
      .GetAllPendingInventoryItemRequests()
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

  PickItemRequestToActOn(item: InventoryItemRequest) {}

  ShowDeclineItemRequested() {}

  ShowApproveItemRequested() {}

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
}
