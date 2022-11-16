import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import {
  CreateInventoryApprovingOfficerVM,
  InventoryApprovingOfficer,
} from "src/app/interfaces/inventory-approving-officer";
import {
  CreateInventoryItemVM,
  InventoryItem,
  UpdateInventoryItemVM,
} from "src/app/interfaces/inventory-item";
import {
  CreatePackSizeVM,
  PackSize,
  UpdatePackSizeVM,
} from "src/app/interfaces/pack-size";
import { User } from "src/app/interfaces/user";
import { InventoryApprovingOfficerService } from "src/app/services/inventory-approving-officer.service";
import { InventoryItemService } from "src/app/services/inventory-item.service";
import { PackSizeService } from "src/app/services/pack-size.service";
import { UserService } from "src/app/services/user.service";

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
  packSizeToEdit: PackSize;

  constructor(
    private fb: FormBuilder,
    private inventoryItemService: InventoryItemService,
    private packSizeService: PackSizeService,
    private userService: UserService,
    private inventoryApprovingOfficerService: InventoryApprovingOfficerService,
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
      { field: "caption", header: "Product Name" },
      { field: "description", header: "Product Description" },
      { field: "dateAdded", header: "Date Added" },
    ];

    this.FetchAllItems();
    this.FetchAllPackSizes();
    this.FetchAllUsers();
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
            "Unable to get all items at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.fetchingItems = false;
      }
    );
  }

  FetchAllPackSizes() {
    this.fetchingPackSize = true;
    this.packSizeService.GetAllPackSizes().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          this.fetchingPackSize = false;
          console.log("Error: " + JSON.stringify(data));
          return;
        }

        this.allPackSizes = data.object;
        this.fetchingPackSize = false;
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
        this.fetchingPackSize = false;
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
        this.FetchAllApprovingOfficers();
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

  FetchAllApprovingOfficers() {
    this.fetchingApprovingOfficers = true;
    this.inventoryApprovingOfficerService
      .GetAllInventoryApprovingOfficers()
      .subscribe(
        async (data) => {
          if (!data.isSuccessful) {
            this.messageService.add({
              severity: "error",
              summary: "Failure",
              detail: data.message,
            });
            this.fetchingApprovingOfficers = false;
            console.log("Error: " + JSON.stringify(data));
            return;
          }

          this.allApprovingOfficers = data.object;
          this.fetchingApprovingOfficers = false;
        },
        (error) => {
          console.log("Error: " + JSON.stringify(error));
          this.messageService.add({
            severity: "error",
            summary: "Notice",
            detail:
              "Unable to get all inventory approving officers at the moment.. Reason: [" +
              error.message +
              "]",
          });
          this.fetchingApprovingOfficers = false;
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

  CreatePackSize() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Creating Pack Size...",
    });

    const postData: CreatePackSizeVM = {
      caption: this.packSizeForm.get("Caption").value,
      description: this.packSizeForm.get("Description").value,
    };

    this.packSizeService.CreatePackSize(postData).subscribe(
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
          detail: "Pack Size Created Successfully...",
        });

        this.packSizeForm.reset();
        this.FetchAllPackSizes();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to create pack size at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  CloseEditingPackSize() {
    this.editingPackSize = false;
    this.packSizeToEdit = null;
    this.packSizeForm.reset();
  }

  UpdatePackSize() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Updating Pack Size...",
    });

    const id = this.packSizeToEdit.id;
    const postData: UpdatePackSizeVM = {
      caption: this.packSizeForm.get("Caption").value,
      description: this.packSizeForm.get("Description").value,
    };

    this.packSizeService.UpdatePackSize(id, postData).subscribe(
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
        this.CloseEditingPackSize();
        this.FetchAllPackSizes();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to update pack size at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  EditPackSize(item: PackSize) {
    this.editingPackSize = true;
    this.packSizeForm.addControl(
      "ID",
      new FormControl({ value: "", disabled: true }, Validators.required)
    );

    this.packSizeToEdit = item;
    this.packSizeForm.patchValue({
      ID: item.id,
      Caption: item.caption,
      Description: item.description,
    });

    this.formWrapper.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  }

  DeletePackSize(item: PackSize) {
    this.confirmationService.confirm({
      message: "Are you sure you want to remove pack size?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Removing pack size...",
        });

        this.packSizeService.DeletePackSize(item.id).subscribe(
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

            this.fetchingPackSize = true;
            this.CloseEditingPackSize();
            const index = this.allPackSizes.indexOf(item);
            if (index > -1) {
              this.allPackSizes.splice(index, 1);
            }
            this.fetchingPackSize = false;
          },
          (error) => {
            console.log("Error: " + JSON.stringify(error));
            this.messageService.add({
              severity: "error",
              summary: "Notice",
              detail:
                "Unable to remove pack size at the moment.. Reason: [" +
                error.message +
                "]",
            });
          }
        );
      },
    });
  }

  CreateApprovingOfficer() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Creating Inventory Approving Officer...",
    });

    const postData: CreateInventoryApprovingOfficerVM = {
      officeUserProfileId: this.theUser.id,
    };

    this.inventoryApprovingOfficerService
      .CreateInventoryApprovingOfficer(postData)
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
            detail: "Inventory Approving Officer Created Successfully...",
          });

          this.approvingOfficerForm.reset();
          this.theUser = null;
          this.FetchAllApprovingOfficers();
        },
        (error) => {
          console.log("Error: " + JSON.stringify(error));
          this.messageService.add({
            severity: "error",
            summary: "Notice",
            detail:
              "Unable to create inventory approving officer at the moment.. Reason: [" +
              error.message +
              "]",
          });
        }
      );
  }

  DeleteApprovingOfficer(item: InventoryApprovingOfficer) {
    this.confirmationService.confirm({
      message: "Are you sure you want to remove inventory approving officer?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Removing inventory approving officer...",
        });

        this.inventoryApprovingOfficerService
          .DeleteInventoryApprovingOfficer(item.id)
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

              this.fetchingApprovingOfficers = true;
              this.approvingOfficerForm.reset();
              this.theUser = null;
              const index = this.allApprovingOfficers.indexOf(item);
              if (index > -1) {
                this.allApprovingOfficers.splice(index, 1);
              }
              this.fetchingApprovingOfficers = false;
            },
            (error) => {
              console.log("Error: " + JSON.stringify(error));
              this.messageService.add({
                severity: "error",
                summary: "Notice",
                detail:
                  "Unable to remove inventory approving officer at the moment.. Reason: [" +
                  error.message +
                  "]",
              });
            }
          );
      },
    });
  }

  GetOfficerName(officerId): string {
    let officer = this.allUsers.find((x) => x.id == officerId);
    if (officer) return officer.lastname + " " + officer.firstname;

    return "N/A";
  }
}
