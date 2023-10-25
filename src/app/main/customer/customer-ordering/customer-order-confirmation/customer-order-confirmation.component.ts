import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { PaymentModeEnum } from "src/app/interfaces/customerorder";
import { User } from "src/app/interfaces/user";
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
  allPendingConfirmations: any[];
  batchOrdersPendingConfirmation: any[];
  orderDetailTable: {
    name: string;
    data: string;
  }[];
  orderInViewConfirmations: any[] = [];
  confirmationCols: any[];
  openPaymentDialogue: boolean;
  selectedOrderPayments: any[];
  orderPaymentCols: any[];
  openConfirmationDialogue: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private customerOrderService: CustomerOrderService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.paymentForm = fb.group({
      AmountToBePaid: [""],
      AmountPaid: ["", Validators.required],
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
  }

  PickBatch(item: any) {}

  HidePaymentDialog() {
    this.openPaymentDialogue = false;
  }

  SaveOrderPayment() {}

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
}
