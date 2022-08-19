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
  batchInView: any;
  allPendingApprovals: any[];
  selectedPendingApprovals: any[];
  pendingApprovalCols: any[];
  approvalInViewDits: any[] = [];
  selectedApprovalDits: any[];
  approvalInViewCols: any[];
  openDeclineDialogue: boolean;

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
  }

  RemoveBatchItem(item: any) {}

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
      detail: "Declining Request" + this.batchInView.name + "...",
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
}
