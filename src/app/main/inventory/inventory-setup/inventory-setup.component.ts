import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { InventoryApprovingOfficer } from "src/app/interfaces/inventory-approving-officer";
import {
  CreateInventoryItemVM,
  InventoryItem,
  UpdateInventoryItemVM,
} from "src/app/interfaces/inventory-item";
import { PackSize } from "src/app/interfaces/pack-size";
import { User } from "src/app/interfaces/user";
import { InventoryItemService } from "src/app/services/inventory-item.service";

@Component({
  selector: "app-inventory-setup",
  templateUrl: "./inventory-setup.component.html",
  styleUrls: ["./inventory-setup.component.scss"],
})
export class InventorySetupComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  itemForm: FormGroup;
  packSizeForm: FormGroup;
  approvingOfficerForm: FormGroup;
  isRawMaterialRadioButton: number;
  editingItem: boolean;
  fetchingItems: boolean;
  allItems: InventoryItem[];
  selectedItems: InventoryItem[];
  itemCols: any[];
  editingPackSize: boolean;
  fetchingPackSize: boolean;
  allPackSizes: PackSize[];
  selectedPackSize: PackSize[];
  packSizeCols: any[];
  allUsers: User[];
  theUser: User;
  fetchingApprovingOfficers: boolean;
  allApprovingOfficers: InventoryApprovingOfficer[];
  itemToEdit: InventoryItem;

  constructor(
    private fb: FormBuilder,
    private inventoryItemService: InventoryItemService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.itemForm = fb.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      IsRawMaterial: ["", Validators.required],
    });

    this.packSizeForm = fb.group({
      Caption: ["", Validators.required],
      Description: ["", Validators.required],
    });

    this.approvingOfficerForm = fb.group({
      Officer: ["", Validators.required],
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

    this.packSizeCols = [
      { field: "name", header: "Product Name" },
      { field: "description", header: "Product Description" },
      { field: "dateAdded", header: "Date Added" },
    ];

    this.FetchAllItems();
  }

  FetchAllItems() {
    this.fetchingItems = true;
    this.inventoryItemService.GetAllInventoryItems().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          this.fetchingItems = false;
          console.log("Error: " + JSON.stringify(data));
          return;
        }

        this.allItems = data.object;
        this.fetchingItems = false;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all products at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.fetchingItems = false;
      }
    );
  }

  CreateItem() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Creating Inventory Item...",
    });

    const postData: CreateInventoryItemVM = {
      name: this.itemForm.get("Name").value,
      description: this.itemForm.get("Description").value,
      isRawMaterial: this.isRawMaterialRadioButton == 1 ? true : false,
    };

    this.inventoryItemService.CreateInventoryItem(postData).subscribe(
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
          detail: "Inventory Item Created Successfully...",
        });

        this.fetchingItems = true;
        this.isRawMaterialRadioButton = null;
        this.itemForm.reset();
        this.FetchAllItems();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to create inventory item  at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  CloseEditingItem() {
    this.editingItem = false;
    this.itemToEdit = null;
    this.isRawMaterialRadioButton = null;
    this.itemForm.reset();
  }

  UpdateItem() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Updating Inventory Item...",
    });

    const id = this.itemToEdit.id;
    const postData: UpdateInventoryItemVM = {
      name: this.itemForm.get("Name").value,
      description: this.itemForm.get("Description").value,
      isRawMaterial: this.isRawMaterialRadioButton == 1 ? true : false,
    };

    this.inventoryItemService.UpdateInventoryItem(id, postData).subscribe(
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
        this.CloseEditingItem();
        this.FetchAllItems();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to update inventory item at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  EditItem(item: InventoryItem) {
    this.editingItem = true;
    this.itemForm.addControl(
      "ID",
      new FormControl({ value: "", disabled: true }, Validators.required)
    );

    this.itemToEdit = item;
    this.itemForm.patchValue({
      ID: item.id,
      Name: item.name,
      Description: item.description,
    });
    this.isRawMaterialRadioButton = item.itemType;

    this.formWrapper.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  }

  DeleteItem(item: InventoryItem) {
    this.confirmationService.confirm({
      message: "Are you sure you want to remove item?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Removing item...",
        });

        this.inventoryItemService.DeleteInventoryItem(item.id).subscribe(
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

            this.fetchingItems = true;
            this.CloseEditingItem();
            const index = this.allItems.indexOf(item);
            if (index > -1) {
              this.allItems.splice(index, 1);
            }
            this.fetchingItems = false;
          },
          (error) => {
            console.log("Error: " + JSON.stringify(error));
            this.messageService.add({
              severity: "error",
              summary: "Notice",
              detail:
                "Unable to remove item at the moment.. Reason: [" +
                error.message +
                "]",
            });
          }
        );
      },
    });
  }

  CreatePackSize() {}

  CloseEditingPackSize() {}

  UpdatePackSize() {}

  EditPackSize(item: PackSize) {}

  DeletePackSize(item: PackSize) {}

  CreateApprovingOfficer() {}

  DeleteApprovingOfficer(item: InventoryApprovingOfficer) {}
}
