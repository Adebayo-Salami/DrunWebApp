import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { InventoryItem } from "src/app/interfaces/inventory-item";
import {
  ConfirmInventoryItemRequestVM,
  InventoryItemRequest,
} from "src/app/interfaces/inventory-operation";
import { PackSize } from "src/app/interfaces/pack-size";
import { User } from "src/app/interfaces/user";
import { InventoryItemService } from "src/app/services/inventory-item.service";
import { InventoryOperationService } from "src/app/services/inventory-operation.service";
import { PackSizeService } from "src/app/services/pack-size.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-inventory-item-confirmation",
  templateUrl: "./i-i-c.component.html",
  styleUrls: ["./i-i-c.component.scss"],
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
    isNumericInput?: boolean;
    isTextInput?: boolean;
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

    this.ResetItemConfirmationsTable();
    this.FetchAllPackSizes();
  }

  ResetItemConfirmationsTable() {
    this.itemConfirmationsTable = [
      {
        field: "Request Name",
        value: "Data",
      },
      {
        field: "Request Description",
        value: "Data",
      },
      {
        field: "Requested Item",
        value: "Data",
      },
      {
        field: "Requested Pack Size",
        value: "Data",
      },
      {
        field: "Requested Quantity",
        value: "Data",
      },
      {
        field: "Quantity Confirmed",
        value: "Data",
      },
      {
        field: "Request Raised By",
        value: "Data",
      },
      {
        field: "Date Request Raised",
        value: "Data",
      },
      {
        field: "",
        value: "",
      },
      {
        field: "Quantity Confirming",
        value: "0",
        isNumericInput: true,
      },
      {
        field: "Confirmation Note",
        value: "Data",
        isTextInput: true,
      },
    ];
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
    this.quantityConfirmed = null;
    this.confirmationNote = null;
    this.itemRequestInView = item;
  }

  ConfirmRequestedItem() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Confirming Item Request...",
    });

    const postData: ConfirmInventoryItemRequestVM = {
      itemRequestId: this.itemRequestInView.id,
      quantityConfirmed: this.quantityConfirmed,
      confirmationNote: this.confirmationNote,
    };

    this.inventoryOperationService
      .ConfirmInventoryItemRequest(postData)
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
            detail: "Item Request Confirmed Successfully...",
          });

          this.fetchingItemConfirmations = true;
          this.quantityConfirmed = null;
          this.confirmationNote = null;
          if (
            postData.quantityConfirmed ==
            this.itemRequestInView.requestedQuantity -
              this.itemRequestInView.quantityConfirmed
          ) {
            this.ResetItemConfirmationsTable();
            this.itemRequestInView = null;
            const index = this.selectedItemConfirmations.indexOf(
              this.itemRequestInView
            );
            if (index > -1) {
              this.selectedItemConfirmations.splice(index, 1);
            }
          } else {
            this.itemRequestInView.quantityConfirmed =
              this.itemRequestInView.quantityConfirmed +
              postData.quantityConfirmed;
          }

          this.LoadItemConfirmations();
          this.fetchingItemConfirmations = false;
        },
        (error) => {
          console.log("Error: " + JSON.stringify(error));
          this.messageService.add({
            severity: "error",
            summary: "Notice",
            detail:
              "Unable to confirm item request at the moment.. Reason: [" +
              error.message +
              "]",
          });
        }
      );
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

  GetUserName(userId): string {
    let officer = this.allUsers.find((x) => x.id == userId);
    if (officer) return officer.lastname + " " + officer.firstname;

    return "N/A";
  }
}
