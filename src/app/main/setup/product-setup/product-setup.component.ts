import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Message, ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import {
  InventoryItem,
  InventoryItemTypeEnum,
} from "src/app/interfaces/inventory-item";
import {
  CreateProductVM,
  Product,
  UpdateProductVM,
} from "src/app/interfaces/product";
import {
  CreateSupplierVM,
  ProductSupplier,
  UpdateSupplierVM,
} from "src/app/interfaces/supplier";
import { InventoryItemService } from "src/app/services/inventory-item.service";
import { ProductService } from "src/app/services/product.service";
import { SupplierService } from "src/app/services/supplier.service";

@Component({
  selector: "app-product-setup",
  templateUrl: "./product-setup.component.html",
  styleUrls: ["./product-setup.component.scss"],
})
export class ProductSetupComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  msgs: Message[] = [];
  cols: any[];
  productForm: FormGroup;
  supplierForm: FormGroup;
  editing: boolean;
  fetching: boolean;
  allProducts: Product[];
  selectedProducts: Product[];
  productToEdit: Product;
  editingSupplier: boolean;
  fetchingSuppliers: boolean;
  allSuppliers: ProductSupplier[];
  selectedSuppliers: ProductSupplier[];
  supplierCols: any[];
  supplierToEdit: ProductSupplier;
  allItems: InventoryItem[];
  theItem: InventoryItem;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private supplierService: SupplierService,
    private inventoryItemService: InventoryItemService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.productForm = fb.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      InventoryItem: ["", Validators.required],
    });

    this.supplierForm = fb.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      Location: ["", Validators.required],
      ContactName: ["", Validators.required],
      ContactMobile: ["", Validators.required],
      ContactEmail: [""],
      ServiceCharge: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        label: "Setup",
        routerLink: ["/main/setup"],
      },
      {
        label: "Product",
        routerLink: ["/main/setup/product"],
      },
    ]);

    this.cols = [
      { field: "name", header: "Product Name" },
      { field: "description", header: "Product Description" },
      { field: "dateAdded", header: "Date Added" },
    ];

    this.supplierCols = [
      { field: "supplierName", header: "Supplier Name" },
      { field: "supplierDescription", header: "Supplier Description" },
      { field: "supplierLocation", header: "Supplier Location" },
      { field: "contactPersonName", header: "Supplier Contact Name" },
      { field: "contactPersonMobile", header: "Supplier Contact Mobile" },
      { field: "contactPersonEmail", header: "Supplier Contact Email" },
      { field: "serviceCharge", header: "Supplier Service Charge" },
      { field: "dateAdded", header: "Date Added" },
    ];

    this.RunMessageDialogue();
    this.FetchAllInventoryItems();
    this.FetchAllProducts();
    this.FetchAllProductSuppliers();
  }

  RunMessageDialogue() {
    // this.msgs = [];
    // this.msgs.push({
    //   severity: "info",
    //   summary: "Notice:",
    //   detail: "This page is for setting up company products.",
    // });
  }

  FetchAllProducts() {
    this.fetching = true;
    this.productService.GetAllProducts().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          this.fetching = false;
          console.log("Error: " + JSON.stringify(data));
          return;
        }
        this.allProducts = data.object;
        this.fetching = false;
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
        this.RunMessageDialogue();
        this.fetching = false;
      }
    );
  }

  FetchAllProductSuppliers() {
    this.fetchingSuppliers = true;
    this.supplierService.GetAllSupplier().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          this.fetchingSuppliers = false;
          console.log("Error: " + JSON.stringify(data));
          return;
        }
        this.allSuppliers = data.object;
        this.fetchingSuppliers = false;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all suppliers at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.RunMessageDialogue();
        this.fetchingSuppliers = false;
      }
    );
  }

  FetchAllInventoryItems() {
    this.inventoryItemService.GetAllInventoryItems().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          this.fetching = false;
          console.log("Error: " + JSON.stringify(data));
          return;
        }
        this.allItems = data.object.filter(
          (x) => x.itemType == InventoryItemTypeEnum.IsProduct
        );
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
        this.RunMessageDialogue();
      }
    );
  }

  CloseEditing() {
    this.editing = false;
    this.productToEdit = null;
    this.productForm.reset();
  }

  CreateProduct() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Creating Product...",
    });
    this.RunMessageDialogue();

    const postData: CreateProductVM = {
      name: this.productForm.get("Name").value,
      description: this.productForm.get("Description").value,
      inventoryItemId: this.theItem.id,
    };

    this.productService.CreateProduct(postData).subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          this.RunMessageDialogue();
          console.log("Error: " + JSON.stringify(data));
          return;
        }

        this.messageService.add({
          severity: "success",
          summary: "Completed",
          detail: "Product Created Successfully...",
        });

        this.RunMessageDialogue();
        this.fetching = true;
        this.productForm.reset();
        this.FetchAllProducts();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to create product  at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.RunMessageDialogue();
      }
    );
  }

  EditProduct(item: Product) {
    this.editing = true;
    this.productForm.addControl(
      "ID",
      new FormControl({ value: "", disabled: true }, Validators.required)
    );
    this.productToEdit = item;
    this.productForm.patchValue({
      ID: item.id,
      Name: item.name,
      Description: item.description,
    });

    this.formWrapper.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  }

  UpdateProduct() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Updating Product...",
    });
    this.RunMessageDialogue();

    const id = this.productToEdit.id;
    const postData: UpdateProductVM = {
      name: this.productForm.get("Name").value,
      description: this.productForm.get("Description").value,
    };

    this.productService.UpdateProduct(id, postData).subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          console.log("Error: " + JSON.stringify(data));
          this.RunMessageDialogue();
          return;
        }

        this.messageService.add({
          severity: "success",
          summary: "Notice",
          detail: "Update Successful!",
        });
        this.RunMessageDialogue();
        this.fetching = true;
        this.CloseEditing();
        this.FetchAllProducts();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to update product at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.RunMessageDialogue();
      }
    );
  }

  DeleteProduct(item: Product) {
    this.confirmationService.confirm({
      message: "Are you sure you want to remove product?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Removing product...",
        });
        this.RunMessageDialogue();

        this.productService.DeleteProduct(item.id).subscribe(
          async (data) => {
            if (!data.isSuccessful) {
              this.messageService.add({
                severity: "error",
                summary: "Failure",
                detail: data.message,
              });
              console.log("Error: " + JSON.stringify(data));
              this.RunMessageDialogue();
              return;
            }

            this.messageService.add({
              severity: "success",
              summary: "Removed",
              detail: "Removed successfully",
            });
            this.RunMessageDialogue();

            this.fetching = true;
            const index = this.allProducts.indexOf(item);
            if (index > -1) {
              this.allProducts.splice(index, 1);
            }
            this.fetching = false;
          },
          (error) => {
            console.log("Error: " + JSON.stringify(error));
            this.messageService.add({
              severity: "error",
              summary: "Notice",
              detail:
                "Unable to remove product at the moment.. Reason: [" +
                error.message +
                "]",
            });
            this.RunMessageDialogue();
          }
        );
      },
    });
  }

  CreateProductSupplier() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Creating Supplier...",
    });
    this.RunMessageDialogue();

    const postData: CreateSupplierVM = {
      supplierName: this.supplierForm.get("Name").value,
      supplierDescription: this.supplierForm.get("Description").value,
      supplierLocation: this.supplierForm.get("Location").value,
      contactPersonName: this.supplierForm.get("ContactName").value,
      contactPersonMobile: this.supplierForm.get("ContactMobile").value,
      contactPersonEmail: this.supplierForm.get("ContactEmail").value,
      serviceCharge: this.supplierForm.get("ServiceCharge").value,
    };

    this.supplierService.CreateSupplier(postData).subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          console.log("Error: " + JSON.stringify(data));
          this.RunMessageDialogue();
          return;
        }

        this.messageService.add({
          severity: "success",
          summary: "Completed",
          detail: "Supplier Created Successfully...",
        });

        this.RunMessageDialogue();
        this.supplierForm.reset();
        this.FetchAllProductSuppliers();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to create supplier  at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.RunMessageDialogue();
      }
    );
  }

  CloseEditingSupplier() {
    this.editingSupplier = false;
    this.supplierToEdit = null;
    this.supplierForm.reset();
  }

  UpdateProductSupplier() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Updating Supplier...",
    });
    this.RunMessageDialogue();

    const id = this.supplierToEdit.id;
    const postData: UpdateSupplierVM = {
      supplierName: this.supplierForm.get("Name").value,
      supplierDescription: this.supplierForm.get("Description").value,
      supplierLocation: this.supplierForm.get("Location").value,
      contactPersonName: this.supplierForm.get("ContactName").value,
      contactPersonMobile: this.supplierForm.get("ContactMobile").value,
      contactPersonEmail: this.supplierForm.get("ContactEmail").value,
      serviceCharge: this.supplierForm.get("ServiceCharge").value,
    };

    this.supplierService.UpdateSupplier(id, postData).subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          console.log("Error: " + JSON.stringify(data));
          this.RunMessageDialogue();
          return;
        }

        this.messageService.add({
          severity: "success",
          summary: "Notice",
          detail: "Update Successful!",
        });
        this.RunMessageDialogue();
        this.CloseEditingSupplier();
        this.FetchAllProductSuppliers();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to update supplier at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.RunMessageDialogue();
      }
    );
  }

  DeleteProductSupplier(item: ProductSupplier) {
    this.confirmationService.confirm({
      message: "Are you sure you want to remove supplier?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Removing supplier...",
        });
        this.RunMessageDialogue();

        this.supplierService.DeleteSupplier(item.id).subscribe(
          async (data) => {
            if (!data.isSuccessful) {
              this.messageService.add({
                severity: "error",
                summary: "Failure",
                detail: data.message,
              });
              console.log("Error: " + JSON.stringify(data));
              this.RunMessageDialogue();
              return;
            }

            this.messageService.add({
              severity: "success",
              summary: "Removed",
              detail: "Removed successfully",
            });
            this.RunMessageDialogue();

            this.CloseEditingSupplier();
            this.fetchingSuppliers = true;
            const index = this.allSuppliers.indexOf(item);
            if (index > -1) {
              this.allSuppliers.splice(index, 1);
            }
            this.fetchingSuppliers = false;
          },
          (error) => {
            console.log("Error: " + JSON.stringify(error));
            this.messageService.add({
              severity: "error",
              summary: "Notice",
              detail:
                "Unable to remove suppler at the moment.. Reason: [" +
                error.message +
                "]",
            });
            this.RunMessageDialogue();
          }
        );
      },
    });
  }

  EditProductSupplier(item: ProductSupplier) {
    this.editingSupplier = true;
    this.supplierForm.addControl(
      "ID",
      new FormControl({ value: "", disabled: true }, Validators.required)
    );

    this.supplierToEdit = item;
    this.supplierForm.patchValue({
      ID: item.id,
      Name: item.supplierName,
      Description: item.supplierDescription,
      Location: item.supplierLocation,
      ContactName: item.contactPersonName,
      ContactMobile: item.contactPersonMobile,
      ContactEmail: item.contactPersonEmail,
      ServiceCharge: item.serviceCharge,
    });

    this.formWrapper.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  }

  GetInventoryItemName(itemId: number): string {
    let item = this.allItems.find((x) => x.id == itemId);
    if (item) return item.name;

    return "N/A";
  }
}
