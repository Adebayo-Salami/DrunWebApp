import {
  CustomerOrderBatchVM,
  CustomerOrderVM,
  PaymentModeEnum,
} from "./../../../../interfaces/customerorder";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { CustomerOrderService } from "src/app/services/customer-order.service";

@Component({
  selector: "app-customer-order-approval",
  templateUrl: "./customer-order-approval.component.html",
  styleUrls: ["./customer-order-approval.component.scss"],
})
export class CustomerOrderApprovalComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  formAccept: FormGroup;
  formDecline: FormGroup;
  batchInView: CustomerOrderBatchVM;
  allPendingApprovals: CustomerOrderBatchVM[];
  selectedPendingApprovals: CustomerOrderBatchVM[];
  pendingApprovalCols: any[];
  approvalInViewDits: CustomerOrderVM[] = [];
  selectedApprovalDits: CustomerOrderVM[];
  approvalInViewCols: any[];
  openDeclineDialogue: boolean;
  fetchingPendingApprovals: boolean;

  constructor(
    private fb: FormBuilder,
    private customerOrderService: CustomerOrderService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.formDecline = fb.group({
      Comment: ["", Validators.required],
    });
    this.formAccept = fb.group({
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
        label: "Approval",
        routerLink: ["/main/customer/ordering/aproval"],
      },
    ]);

    this.pendingApprovalCols = [
      { field: "batchName", header: "Batch Name" },
      { field: "batchDescription", header: "Batch Desc" },
    ];

    this.approvalInViewCols = [
      { field: "batchName", header: "Batch Name" },
      { field: "batchDescription", header: "Batch Desc" },
    ];

    this.GetAllBatchPendingApprovals();
  }

  GetAllBatchPendingApprovals() {
    this.fetchingPendingApprovals = true;
    this.customerOrderService.GetAllBatchPendingApproval().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          this.fetchingPendingApprovals = false;
          console.log("Error: " + JSON.stringify(data));
          return;
        }

        this.allPendingApprovals = data.object;
        this.fetchingPendingApprovals = false;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all pending approvals at the moment.. Reason: [" +
            error.message +
            "]",
        });
      }
    );
  }

  RemoveBatchItem(item: CustomerOrderVM) {}

  ShowDeclineBatch() {
    this.openDeclineDialogue = true;
  }

  HideDeclineBatchDialogue() {
    this.openDeclineDialogue = false;
  }

  DeclineBatch() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Declining Request " + this.batchInView.name + "...",
    });
  }

  ApproveBatch() {
    if (this.approvalInViewDits.length == 0) {
      this.messageService.add({
        severity: "error",
        summary: "Notice",
        detail:
          "Unable to approve request at the moment.. Reason: [You must approve at least one batch item to proceed.]",
      });
      return;
    }
  }

  GetTotalQuantity(data: CustomerOrderVM[]): number {
    let totalQty: number = 0;
    data.forEach((order) => (totalQty += order.quantity));
    return totalQty;
  }

  GetTotalAmountPaid(data: CustomerOrderVM[]): number {
    let totalAmt: number = 0;
    data.forEach((order) => (totalAmt += order.amountPaid));
    return totalAmt;
  }

  GetTotalAmountToBePaid(data: CustomerOrderVM[]): number {
    let totalAmt: number = 0;
    data.forEach((order) => (totalAmt += order.amountToBePaid));
    return totalAmt;
  }

  ViewRequest(item: CustomerOrderBatchVM) {
    this.batchInView = item;
    this.approvalInViewDits = item.customerOrders;
  }

  GetPaymentModeLabel(mode: number): string {
    if (mode == PaymentModeEnum.Card) return "Card";
    if (mode == PaymentModeEnum.Cash) return "Cash";
    if (mode == PaymentModeEnum.Transfer) return "Transfer";

    return "N/A";
  }
}
