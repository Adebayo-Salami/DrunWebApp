import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { InventoryStoreItemService } from "src/app/services/inventory-store-item.service";
import { InventoryStoreItem } from "src/app/interfaces/inventory-store-item";
import { InventoryLog } from "src/app/interfaces/inventory-operation";
import { InventoryItem } from "src/app/interfaces/inventory-item";
import { PackSize } from "src/app/interfaces/pack-size";
import { InventoryItemService } from "src/app/services/inventory-item.service";
import { PackSizeService } from "src/app/services/pack-size.service";

@Component({
  selector: "app-inventory-item-store",
  templateUrl: "./inventory-item-store.component.html",
  styleUrls: ["./inventory-item-store.component.scss"],
})
export class InventoryItemStoreComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  storeDetailTable: {
    name: string;
    data: string;
  }[];
  selectedstoreDetailTable: {
    name: string;
    data: string;
  };
  fetchingInventoryItems: boolean;
  inventoryItems: InventoryStoreItem[];
  selectedInventoryItems: InventoryStoreItem[];
  inventoryItemCols: any[];
  openInventoryItemDetailDialogue: boolean;
  inventoryItemInView: InventoryStoreItem;
  openInventoryItemHistoryDialogue: boolean;
  fetchingInventoryItemHistory: boolean;
  inventoryItemHistories: InventoryLog[];
  selectedInventoryItemHistory: InventoryLog[];
  inventoryItemHistoryCols: any[];
  showItemsInStore: boolean;
  allItems: InventoryItem[];
  allPackSizes: PackSize[];

  constructor(
    fb: FormBuilder,
    private inventoryStoreItemService: InventoryStoreItemService,
    private inventoryItemService: InventoryItemService,
    private packSizeService: PackSizeService,
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
        label: "Item Store",
        routerLink: ["/main/inventory/item-store"],
      },
    ]);

    this.storeDetailTable = [
      {
        name: "Company Name",
        data: ".......",
      },
      {
        name: "Distinct Items Count",
        data: ".......",
      },
      {
        name: "Total Items In Inventory",
        data: ".......",
      },
      {
        name: "Total Inventory Value",
        data: ".......",
      },
      {
        name: "",
        data: "",
      },
    ];

    this.inventoryItemCols = [
      { field: "caption", header: "Item.caption" },
      { field: "description", header: "Item.description" },
      { field: "quantity", header: "Quantity" },
    ];

    this.inventoryItemHistoryCols = [
      { field: "batchRequest.name", header: "BatchRequest.name" },
      { field: "batchRequest.batchNumber", header: "BatchRequest.batchNumber" },
      { field: "batchRequest.description", header: "BatchRequest.description" },
      { field: "batchRequest.createdAt", header: "BatchRequest.createdAt" },
    ];

    this.LoadStoreSummary();
    this.FetchAllItems();
    this.FetchAllPackSizes();
  }

  LoadStoreSummary() {
    this.inventoryStoreItemService.GetInventoryStoreSummary().subscribe(
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

        this.storeDetailTable[0].data = data.object.companyName;
        this.storeDetailTable[1].data =
          data.object.distinctItemsInStoreCount.toLocaleString();
        this.storeDetailTable[2].data =
          data.object.itemsInStoreCount.toLocaleString();
        this.storeDetailTable[3].data =
          "N" + data.object.totalInventoryValue.toLocaleString();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to store summary at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  MakeStoreItemRequest() {
    window.open(
      "http://localhost:4200/" + "#/main/inventory/item-request",
      "_self"
    );
  }

  LoadItemsInStore() {
    this.showItemsInStore = true;
    this.fetchingInventoryItems = true;
    this.inventoryStoreItemService.GetAllInventoryItemsInStore().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          this.fetchingInventoryItems = false;
          console.log("Error: " + JSON.stringify(data));
          return;
        }

        this.inventoryItems = data.object;
        this.fetchingInventoryItems = false;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all items in store at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.fetchingInventoryItems = false;
      }
    );
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

  GetItemDescription(itemId: number): string {
    let item = this.allItems.find((x) => x.id == itemId);
    if (item) return item.description;

    return "N/A";
  }

  GetItemType(itemId: number): number {
    let item = this.allItems.find((x) => x.id == itemId);
    if (item) return item.itemType;

    return 0;
  }

  ShowInventoryItemDetails(item: InventoryStoreItem) {
    this.inventoryItemInView = item;
  }

  ShowInventoryItemHistory(item: InventoryStoreItem) {}

  HideInvetoryItemDetailDialog() {}

  HideInventoryItemHistoryDialog() {}
}
