import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import {
  AddCutomerOrderPaymentRecordVM,
  CustomerOrderBatchVM,
  CustomerOrderPaymentVM,
  CustomerOrderVM,
  PaymentModeEnum,
} from "src/app/interfaces/customerorder";
import { User } from "src/app/interfaces/user";
import { AuthService } from "src/app/services/auth.service";
import { CustomerOrderService } from "src/app/services/customer-order.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-customer-order-confirmation",
  templateUrl: "./customer-order-confirmation.component.html",
  styleUrls: ["./customer-order-confirmation.component.scss"],
})
export class CustomerOrderConfirmationComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  paymentForm: FormGroup;
  confirmationForm: FormGroup;
  allUsers: User[];
  fetchingPendingConfirmation: boolean;
  allPendingConfirmations: CustomerOrderBatchVM[];
  orderDetailTable: {
    name: string;
    data: string;
  }[];
  orderInViewConfirmations: any[] = [];
  confirmationCols: any[];
  openPaymentDialogue: boolean;
  orderPaymentCols: any[];
  openConfirmationDialogue: boolean;
  batchInView: CustomerOrderBatchVM;
  orderInViewForPayment: CustomerOrderVM;
  orderInViewForConfirmation: CustomerOrderVM;
  allPaymentModes: {
    key: PaymentModeEnum;
    value: string;
  }[];
  thePaymentMode: {
    key: PaymentModeEnum;
    value: string;
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private customerOrderService: CustomerOrderService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.paymentForm = fb.group({
      AmountToBePaid: [""],
      AmountPaid: ["", Validators.required],
      PaymentMode: ["", Validators.required],
      Comment: ["", Validators.required],
    });

    this.confirmationForm = fb.group({
      QuantityRemaining: [""],
      QuantityConfirmed: ["", Validators.required],
      Comment: ["", Validators.required],
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
      {
        label: "Confirmation",
        routerLink: ["/main/customer/ordering/confirmation"],
      },
    ]);

    this.orderDetailTable = [
      {
        name: "Customer Name",
        data: "",
      },
      {
        name: "Product Name",
        data: "",
      },
      {
        name: "Quantity Ordered",
        data: "",
      },
      {
        name: "Pack Size",
        data: "",
      },
      {
        name: "Unit Price",
        data: "",
      },
      {
        name: "Amount To Be Paid",
        data: "",
      },
      {
        name: "Amount Paid",
        data: "",
      },
      {
        name: "Date Created",
        data: "",
      },
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

    this.confirmationCols = [
      { field: "dateCreated", header: "Date Confirmed" },
      { field: "createdBy", header: "Confirmed By" },
      { field: "quantity", header: "Quantity Confirmed" },
      { field: "comment", header: "Comment" },
      { field: "productName", header: "Product" },
    ];

    this.orderPaymentCols = [
      { field: "customerOrderId", header: "OrderId" },
      { field: "createdBy", header: "Captured By" },
      { field: "amounPaid", header: "Amount Paid" },
      { field: "comment", header: "Comment" },
      { field: "paymentMode", header: "Mode of Payment" },
    ];

    this.FetchAllPendingConfirmation();
  }

  async FetchAllPendingConfirmation() {
    this.fetchingPendingConfirmation = true;
    this.customerOrderService.GetAllBatchPendingConfirmation().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          this.fetchingPendingConfirmation = false;
          return;
        }

        this.allPendingConfirmations = data.object;
        this.fetchingPendingConfirmation = false;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all pending confirmation at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.fetchingPendingConfirmation = false;
      }
    );
  }

  PickBatch(item: CustomerOrderBatchVM) {
    this.batchInView = item;
  }

  HidePaymentDialog() {
    this.openPaymentDialogue = false;
    this.orderInViewForPayment = null;
  }

  SaveOrderPayment() {
    this.confirmationService.confirm({
      header: "Confirmation",
      message:
        "Are you sure you want to save this payment record. This is an irreversible action, Do you still wish to proceed?",
      acceptLabel: "Yes,Proceed",
      rejectLabel: "No, Don't Proceed",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Saving Payment Record...",
        });

        const postData: AddCutomerOrderPaymentRecordVM = {
          customerOrderId: this.orderInViewForPayment.id,
          amountPaid: this.paymentForm.get("AmountPaid").value,
          comment: this.paymentForm.get("Comment").value,
          paymentMode: this.thePaymentMode.key,
        };

        this.customerOrderService
          .AddCutomerOrderPaymentRecord(postData)
          .subscribe(
            async (data) => {
              if (!data.isSuccessful) {
                this.messageService.add({
                  severity: "error",
                  summary: "Failure",
                  detail: data.message,
                });
                return;
              }

              this.messageService.add({
                severity: "success",
                summary: "Removed",
                detail: "Saved successfully",
              });
              this.orderInViewForPayment.payments.push({
                id: this.orderInViewForPayment.payments.length + 1,
                customerOrderId: postData.customerOrderId,
                amountPaid: postData.amountPaid,
                paymentMode: postData.paymentMode,
                createdBy:
                  this.authService.GetLoggedInUserProfile().lastname +
                  " " +
                  this.authService.GetLoggedInUserProfile().othername,
                dateCreated: null,
              });
            },
            (error) => {
              console.log("Error: " + JSON.stringify(error));
              this.messageService.add({
                severity: "error",
                summary: "Notice",
                detail:
                  "Unable to save payment record at the moment.. Reason: [" +
                  error.message +
                  "]",
              });
            }
          );
      },
    });
  }

  GetPaymentModeLabel(mode: number): string {
    if (mode == PaymentModeEnum.Card) return "Card";
    if (mode == PaymentModeEnum.Cash) return "Cash";
    if (mode == PaymentModeEnum.Transfer) return "Transfer";

    return "N/A";
  }

  HideConfirmationDialog() {
    this.openConfirmationDialogue = false;
  }

  SaveOrderConfimration() {}

  AddNewConfirmation() {
    this.openConfirmationDialogue = true;
  }

  FormatDateString(date: Date): string {
    let dateString = date.toString();

    try {
      // DateTimeFormatOptions
      const date: Date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate: string = new Intl.DateTimeFormat(
        "en-US",
        options
      ).format(date);
      dateString = formattedDate;
    } catch (error) {
      console.log(error);
      console.log(date);
      console.log(
        "Error while converting date string " + date + " exception " + error
      );
    }

    return dateString;
  }

  AddOrderPayment(item: CustomerOrderVM) {
    this.orderInViewForPayment = item;
    this.paymentForm.patchValue({
      AmountToBePaid:
        item.amountToBePaid - (item.amountPaid + item.additionalAmountPaid),
    });
    this.openPaymentDialogue = true;
  }
}
