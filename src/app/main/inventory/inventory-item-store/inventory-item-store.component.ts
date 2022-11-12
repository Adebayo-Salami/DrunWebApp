import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";

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
  inventoryItems: any[];
  selectedInventoryItems: any[];
  inventoryItemCols: any[];
  openInventoryItemDetailDialogue: boolean;
  inventoryItemInView: any;

  constructor(
    fb: FormBuilder,
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
        data: "Deran Energy Ltd",
      },
      {
        name: "Total Items In Inventory",
        data: "100,000",
      },
      {
        name: "Total Inventory Value",
        data: "N100,000,000",
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
  }

  MakeStoreItemRequest() {}

  LoadItemsInStore() {}

  ShowInventoryItemDetails(item: any) {}

  ShowInventoryItemHistory(item: any) {}

  HideInvetoryItemDetailDialog() {}
}
