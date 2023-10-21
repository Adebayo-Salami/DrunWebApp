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
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/interfaces/user";
import { PackSizeService } from "src/app/services/pack-size.service";
import { PackSize } from "src/app/interfaces/pack-size";

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
  allUsers: User[];
  allPackSizes: PackSize[];
  openCautionDialogue: boolean;
  cautionText: string;
  cautionAction: number;

  constructor(
    private fb: FormBuilder,
    private packSizeService: PackSizeService,
    private userService: UserService,
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

    this.FetchAllPackSizes();
    this.FetchAllUsers();
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

  RemoveBatchItem(item: CustomerOrderVM) {
    if (this.approvalInViewDits.length == 1) {
      this.messageService.add({
        severity: "error",
        summary:
          "Please kindly decline batch instead, this is the only order left in the batch",
      });
      console.log("Error: Only one batch left");
      return;
    }

    this.confirmationService.confirm({
      message:
        "Are you sure you want to remove this batch item from this order?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Removing batch Item...",
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

            const index = this.approvalInViewDits.indexOf(item);
            if (index > -1) {
              this.approvalInViewDits.splice(index, 1);
            }
          },
          (error) => {
            console.log("Error: " + JSON.stringify(error));
            this.messageService.add({
              severity: "error",
              summary: "Notice",
              detail:
                "Unable to remove batch item at the moment.. Reason: [" +
                error.message +
                "]",
            });
          }
        );
      },
    });
  }

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

    this.cautionText =
      "You are about to approve batch order " +
      this.batchInView.name +
      ". This is an irreversible action. Do you still wish to proceed?";
    this.cautionAction = 1;
    this.openCautionDialogue = true;
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

  GetUserName(userEmail): string {
    let user = this.allUsers.find((x) => x.email == userEmail);
    if (user) return user.lastname + " " + user.firstname;

    return "N/A";
  }

  GetPackSizeEnumString(id: number): string {
    let packSize = this.allPackSizes.find((x) => x.id == id);
    if (packSize) return packSize.caption;

    return "N/A";
  }

  HideCautionDialog() {
    this.openCautionDialogue = false;
    this.cautionAction = null;
    this.cautionText = null;
  }
}
