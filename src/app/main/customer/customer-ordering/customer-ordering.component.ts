import {
  CreateCustomerOrderVM,
  LogCustomerOrderBatchVM,
  UpdateCustomerOrderVM,
} from "./../../../interfaces/customerorder";
import { ProductService } from "./../../../services/product.service";
import { Product } from "./../../../interfaces/product";
import { CustomerVM } from "./../../../interfaces/customer";
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
  CustomerOrderVM,
  PackSizeEnum,
  PaymentModeEnum,
} from "src/app/interfaces/customerorder";
import { CustomerOrderService } from "src/app/services/customer-order.service";
import { CustomerService } from "src/app/services/customer.service";
import { PackSize } from "src/app/interfaces/pack-size";
import { PackSizeService } from "src/app/services/pack-size.service";

@Component({
  selector: "app-customer-ordering",
  templateUrl: "./customer-ordering.component.html",
  styleUrls: ["./customer-ordering.component.scss"],
})
export class CustomerOrderingComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  batchForm: FormGroup;
  msgs: Message[] = [];
  cols: any[];
  customerOrderForm: FormGroup;
  editing: boolean;
  fetching: boolean;
  allCustomerOrders: CustomerOrderVM[] = [];
  selectedCustomerOrders: CustomerOrderVM[];
  allCustomers: CustomerVM[];
  theCustomer: CustomerVM;
  allProducts: Product[];
  theProduct: Product;
  allPackSizes: PackSize[];
  thePackSize: PackSize;
  allPaymentModes: {
    key: number;
    value: string;
  }[];
  thePaymentModes: {
    key: number;
    value: string;
  };
  customerOrderToEdit: any;
  openCreateBatchDialogue: boolean;

  constructor(
    private fb: FormBuilder,
    private packSizeService: PackSizeService,
    private customerService: CustomerService,
    private productService: ProductService,
    private customerOrderService: CustomerOrderService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.customerOrderForm = fb.group({
      Customer: ["", Validators.required],
      Product: ["", Validators.required],
      Quantity: ["", Validators.required],
      PackSize: ["", Validators.required],
      UnitPrice: ["", Validators.required],
      AmountToPay: [""],
      PaymentMode: ["", Validators.required],
      AmountPaid: ["", Validators.required],
      DatePaid: ["", Validators.required],
    });

    this.batchForm = fb.group({
      BatchName: ["", Validators.required],
      BatchDescription: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        label: "Cutomer Service",
        routerLink: ["/main/customer"],
      },
      {
        label: "Ordering",
        routerLink: ["/main/customer/ordering"],
      },
    ]);

    this.cols = [
      { field: "customerName", header: "Customer" },
      { field: "productName", header: "Product" },
      { field: "packSize", header: "Pack Size" },
      { field: "unitPrice", header: "Unit Price" },
      { field: "quantity", header: "Quantity" },
      { field: "amountPaid", header: "Amount Paid" },
      { field: "modeOfPayment", header: "Mode of Payment" },
      { field: "amountToBePaid", header: "Amount To Be Paid" },
    ];

    this.allPaymentModes = [
      {
        key: PaymentModeEnum.Cash,
        value: "Cash",
      },
      {
        key: PaymentModeEnum.Transfer,
        value: "Transfer",
      },
      {
        key: PaymentModeEnum.Card,
        value: "Card",
      },
      {
        key: PaymentModeEnum.Mixture,
        value: "Mixture",
      },
    ];

    this.FetchAllCustomers();
    this.FetchAllProducts();
    this.FetchAllPackSizes();
    this.GetOngoingOrderBatch();
  }

  FetchAllCustomers() {
    this.customerService.GetAllCustomers().subscribe(
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
        this.allCustomers = data.object;
        this.fetching = false;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all customers at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  FetchAllProducts() {
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

  GetOngoingOrderBatch() {
    this.fetching = true;
    this.customerOrderService.GetOngoingBatch().subscribe(
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
        this.allCustomerOrders = data.object as CustomerOrderVM[];
        this.fetching = false;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get ongoing batch at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.fetching = false;
      }
    );
  }

  CreateCustomerOrder() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Creating Customer Order...",
    });

    const postData: CreateCustomerOrderVM = {
      customerId: this.theCustomer.id,
      customerName: this.theCustomer.name,
      productId: this.theProduct.id,
      productName: this.theProduct.name,
      quantity: this.customerOrderForm.get("Quantity").value,
      packSizeId: this.thePackSize.id,
      unitPrice: this.customerOrderForm.get("UnitPrice").value,
      paymentMethod: this.thePaymentModes.key,
      amountPaid: this.customerOrderForm.get("AmountPaid").value,
      datePaid: this.customerOrderForm.get("DatePaid").value,
    };

    this.customerOrderService.CreateCustomerOrder(postData).subscribe(
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
          detail: "Customer Order Created Successfully...",
        });

        this.fetching = true;
        this.customerOrderForm.reset();
        this.GetOngoingOrderBatch();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to create customer order at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  EditOrder(item: CustomerOrderVM) {
    this.editing = true;
    this.customerOrderForm.addControl(
      "ID",
      new FormControl({ value: "", disabled: true }, Validators.required)
    );
    this.customerOrderToEdit = item;
    this.theCustomer = this.allCustomers.find((x) => x.id == item.customerId);
    this.theProduct = this.allProducts.find((x) => x.id == item.productId);
    this.thePackSize = this.allPackSizes.find((x) => x.id == item.packSizeId);
    this.thePaymentModes = this.allPaymentModes.find(
      (x) => x.key == item.paymentMode
    );
    this.customerOrderForm.patchValue({
      ID: item.id,
      Quantity: item.quantity,
      UnitPrice: item.unitPrice,
      AmountPaid: item.amountPaid,
      DatePaid: item.datePaid,
    });

    this.formWrapper.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  }

  UpdateCustomerOrder() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Updating Customer Order...",
    });

    const id = this.customerOrderToEdit.id;
    const postData: UpdateCustomerOrderVM = {
      customerId: this.theCustomer.id,
      customerName: this.theCustomer.name,
      productId: this.theProduct.id,
      productName: this.theProduct.name,
      quantity: this.customerOrderForm.get("Quantity").value,
      packSizeId: this.thePackSize.id,
      unitPrice: this.customerOrderForm.get("UnitPrice").value,
      paymentMethod: this.thePaymentModes.key,
      amountPaid: this.customerOrderForm.get("AmountPaid").value,
      datePaid: this.customerOrderForm.get("DatePaid").value,
    };

    this.customerOrderService.UpdateCustomerOrder(id, postData).subscribe(
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
        this.fetching = true;
        this.CloseEditing();
        this.FetchAllCustomers();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to update customer order at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  CloseEditing() {
    this.editing = false;
    this.customerOrderToEdit = null;
    this.customerOrderForm.reset();
  }

  DeleteOrder(item: CustomerOrderVM) {
    this.confirmationService.confirm({
      message: "Are you sure you want to remove customer order?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Removing customer order...",
        });

        this.customerOrderService.DeleteCustomerOrder(item.id).subscribe(
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

            this.fetching = true;
            const index = this.allCustomerOrders.indexOf(item);
            if (index > -1) {
              this.allCustomerOrders.splice(index, 1);
            }
            this.fetching = false;
          },
          (error) => {
            console.log("Error: " + JSON.stringify(error));
            this.messageService.add({
              severity: "error",
              summary: "Notice",
              detail:
                "Unable to remove customer order at the moment.. Reason: [" +
                error.message +
                "]",
            });
          }
        );
      },
    });
  }

  GetPackSizeEnumString(id: number): string {
    let packSize = this.allPackSizes.find((x) => x.id == id);
    if (packSize) return packSize.caption;

    return "N/A";
  }

  GetPaymentModeEnumString(enumValue: number): string {
    if (enumValue == PaymentModeEnum.Cash) return "Cash";
    if (enumValue == PaymentModeEnum.Transfer) return "Transfer";
    if (enumValue == PaymentModeEnum.Card) return "Card";
    if (enumValue == PaymentModeEnum.Mixture) return "Mixture";

    return "N/A";
  }

  SubmitOrderBatch() {
    this.openCreateBatchDialogue = true;
  }

  get Quantity(): number {
    let value = 0;
    if (this.customerOrderForm.get("Quantity").value)
      value = +this.customerOrderForm.get("Quantity").value;
    return value;
  }

  get UnitPrice(): number {
    let value = 0;
    if (this.customerOrderForm.get("UnitPrice").value)
      value = +this.customerOrderForm.get("UnitPrice").value;
    return value;
  }

  HideBatchDialogue() {
    this.openCreateBatchDialogue = false;
    this.batchForm.reset();
  }

  SubmitBatchApproval() {
    this.openCreateBatchDialogue = false;
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Submitting Batch For Approval...",
    });

    const postData: LogCustomerOrderBatchVM = {
      batchName: this.batchForm.get("BatchName").value,
      batchDescription: this.batchForm.get("BatchDescription").value,
    };

    this.customerOrderService.LogCustomerOrderBatch(postData).subscribe(
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
          detail: "Product Created Successfully...",
        });

        this.fetching = true;
        this.batchForm.reset();
        this.GetOngoingOrderBatch();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to log customer order batch  at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }
}
