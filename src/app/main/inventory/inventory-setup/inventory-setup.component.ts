import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";

@Component({
  selector: "app-inventory-setup",
  templateUrl: "./inventory-setup.component.html",
  styleUrls: ["./inventory-setup.component.scss"],
})
export class InventorySetupComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  itemForm: FormGroup;
  isRawMaterialRadioButton: number;
  editingItem: boolean;
  fetchingItems: boolean;
  allItems: any[];
  selectedItems: any[];
  itemCols: any[];

  constructor(
    private fb: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.itemForm = fb.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      IsRawMaterial: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        label: "Inventory",
        routerLink: ["/main/inventory"],
      },
      {
        label: "Setup",
        routerLink: ["/main/inventory/setup"],
      },
    ]);

    this.itemCols = [
      { field: "name", header: "Product Name" },
      { field: "description", header: "Product Description" },
      { field: "isRawMaterial", header: "Is Raw Material" },
      { field: "dateAdded", header: "Date Added" },
    ];
  }

  CreateIItem() {}

  CreatePackSize() {}

  CloseEditingItem() {}

  UpdateItem() {}
}
