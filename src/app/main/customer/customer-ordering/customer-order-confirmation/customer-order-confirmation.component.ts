import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
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
  allUsers: User[];
  fetchingPendingConfirmation: boolean;
  allPendingConfirmations: any[];

  constructor(
    private userService: UserService,
    private customerOrderService: CustomerOrderService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {}

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
  }

  PickBatch(item: any) {}
}
