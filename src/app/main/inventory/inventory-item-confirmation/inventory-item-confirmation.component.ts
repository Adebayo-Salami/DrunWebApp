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
  selector: "app-inventory-item-confirmation",
  templateUrl: "./inventory-item-confirmation.component.html",
  styleUrls: ["./inventory-item-confirmation.component.scss"],
})
export class InventoryItemConfirmationComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  allInventoryItems: InventoryItem[];
  theInventoryItem: InventoryItem;
  fetchingItemConfirmations: boolean;
  selectedItemConfirmations: InventoryItemRequest[];
  itemConfirmationCols: any[];
  itemConfirmationsTable: {
    field: string;
    value: string;
    isInput: boolean;
  }[];
  quantityConfirmed: number;
  confirmationNote: string;
  showItemConfirmations: boolean;
  itemRequestInView: InventoryItemRequest;
  allPackSizes: PackSize[];
  allUsers: User[];

  constructor(
    fb: FormBuilder,
    private inventoryItemService: InventoryItemService,
    private packSizeService: PackSizeService,
    private userService: UserService,
    private inventoryOperationService: InventoryOperationService,
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
        label: "Item Confirmation",
        routerLink: ["/main/inventory/item-confirmation"],
      },
    ]);

    this.itemConfirmationCols = [
      { field: "batchName", header: "BatchName" },
      { field: "batchDescription", header: "BatchDescription" },
      { field: "itemQty", header: "Item Quantity" },
    ];

    this.itemConfirmationsTable = [
      {
        field: "Request Name",
        value: "Data",
        isInput: false,
      },
      {
        field: "Request Description",
        value: "Data",
        isInput: false,
      },
      {
        field: "Requested Item",
        value: "Data",
        isInput: false,
      },
      {
        field: "Requested Pack Size",
        value: "Data",
        isInput: false,
      },
      {
        field: "Requested Quantity",
        value: "Data",
        isInput: false,
      },
      {
        field: "Quantity Confirmed",
        value: "Data",
        isInput: false,
      },
      {
        field: "Request Raised By",
        value: "Data",
        isInput: false,
      },
      {
        field: "Date Request Raised",
        value: "Data",
        isInput: false,
      },
      {
        field: "",
        value: "",
        isInput: false,
      },
      {
        field: "Quantity Confirming",
        value: "0",
        isInput: true,
      },
      {
        field: "Confirmation Note",
        value: "Data",
        isInput: true,
      },
    ];

    this.FetchAllPackSizes();
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
        this.FetchAllItems();
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

  LoadItemConfirmations() {
    if (!this.theInventoryItem) {
      this.showItemConfirmations = false;
      this.itemRequestInView = null;
      this.selectedItemConfirmations = [];
      return;
    }
    this.showItemConfirmations = true;
    this.selectedItemConfirmations = [];
    this.itemRequestInView = null;
    this.fetchingItemConfirmations = true;
    this.inventoryOperationService
      .GetApprovedInventoryItemRequests(this.theInventoryItem.id)
      .subscribe(
        async (data) => {
          if (!data.isSuccessful) {
            this.messageService.add({
              severity: "error",
              summary: "Failure",
              detail: data.message,
            });
            this.fetchingItemConfirmations = false;
            console.log("Error: " + JSON.stringify(data));
            return;
          }

          this.selectedItemConfirmations = data.object;
          this.fetchingItemConfirmations = false;
        },
        (error) => {
          console.log("Error: " + JSON.stringify(error));
          this.messageService.add({
            severity: "error",
            summary: "Notice",
            detail:
              "Unable to get all pending confirmation item requests at the moment.. Reason: [" +
              error.message +
              "]",
          });
          this.fetchingItemConfirmations = false;
        }
      );
  }

  LoadRequestDetails(item: InventoryItemRequest) {
    this.itemConfirmationsTable[0].value = item.requestName;
    this.itemConfirmationsTable[1].value = item.requestDescription;
    this.itemConfirmationsTable[2].value = this.GetItemName(
      item.requestedItemId
    );
    this.itemConfirmationsTable[3].value = this.GetPackSizeCaption(
      item.requestedPackSizeId
    );
    this.itemConfirmationsTable[4].value =
      item.requestedQuantity.toLocaleString();
    this.itemConfirmationsTable[5].value =
      item.quantityConfirmed.toLocaleString();
    this.itemConfirmationsTable[6].value = this.GetUserName(item.createdById);
    this.itemConfirmationsTable[7].value = item.dateAdded
      .toString()
      .slice(0, 10);
    this.itemRequestInView = item;
  }

  ConfirmRequestedItem() {}

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

  GetUserName(userId): string {
    let officer = this.allUsers.find((x) => x.id == userId);
    if (officer) return officer.lastname + " " + officer.firstname;

    return "N/A";
  }
}
