import { PagesEnum } from "./../../../interfaces/main";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService, Message, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";

@Component({
  selector: "app-role-setup",
  templateUrl: "./role-setup.component.html",
  styleUrls: ["./role-setup.component.scss"],
  providers: [MessageService],
})
export class RoleSetupComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  msgs: Message[] = [];
  cols: any[];
  roleForm: FormGroup;
  allPages: {
    key: number;
    value: string;
  }[];
  selectedPages: {
    key: number;
    value: string;
  }[];
  editing: boolean = false;
  fetching: boolean = true;

  constructor(
    private fb: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.roleForm = fb.group({
      RoleName: ["", Validators.required],
      RoleDescription: ["", Validators.required],
      // RolePages: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        label: "Setup",
        routerLink: ["/main/setup"],
      },
      {
        label: "Role",
        routerLink: ["/main/setup/role"],
      },
    ]);

    this.cols = [
      { field: "rolename", header: "Role Name" },
      { field: "roledescription", header: "Role Description" },
    ];

    this.allPages = [
      {
        key: PagesEnum.Dashboard,
        value: "Dashboard",
      },
      {
        key: PagesEnum.Setup_Role,
        value: "Setup Role",
      },
      {
        key: PagesEnum.Setup_Product,
        value: "Setup Product",
      },
      {
        key: PagesEnum.Customer_Onboarding,
        value: "Customer Onboarding",
      },
      {
        key: PagesEnum.Customer_Ordering,
        value: "Customer Ordering",
      },
      {
        key: PagesEnum.Customer_Reporting,
        value: "Customer Reporting",
      },
    ];

    this.RunMessageDialogue();
  }

  RunMessageDialogue() {
    this.msgs = [];
    this.msgs.push({
      severity: "info",
      summary: "Notice:",
      detail: "This page is for setting up company roles and pages permission.",
    });
  }

  CloseEditing() {
    this.editing = false;
    this.selectedPages = [];
    this.roleForm.reset();
  }

  CreateRole() {}

  UpdateRole() {}
}
