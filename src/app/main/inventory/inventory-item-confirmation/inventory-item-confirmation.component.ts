import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { InventoryItem } from "src/app/interfaces/inventory-item";
import { InventoryItemRequest } from "src/app/interfaces/inventory-operation";
import { InventoryItemService } from "src/app/services/inventory-item.service";

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
  selectedItemConfirmations: any[];
  itemConfirmationCols: any[];
  itemConfirmationsTable: {
    field: string;
    value: string;
    isInput: boolean;
  }[];
  quantityConfirmed: number;
  confirmationNote: string;
  itemRequestInView: InventoryItemRequest;

  constructor(
    fb: FormBuilder,
    private inventoryItemService: InventoryItemService,
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
        field: "Batch Name",
        value: "Data",
        isInput: false,
      },
      {
        field: "Batch Description",
        value: "Data",
        isInput: false,
      },
      {
        field: "Item Name",
        value: "Data",
        isInput: false,
      },
      {
        field: "Quantity Requested",
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

  LoadItemConfirmations() {}

  ConfirmRequestedItem() {}
}
