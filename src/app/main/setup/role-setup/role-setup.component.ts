import { RoleService } from "./../../../services/role.service";
import { PagesEnum } from "./../../../interfaces/main";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService, Message, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { CreateRoleVM, RoleVM } from "src/app/interfaces/role";

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
  }[] = [];
  editing: boolean;
  fetching: boolean;
  allRoles: RoleVM[];
  selectedRole: RoleVM;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.roleForm = fb.group({
      RoleName: ["", Validators.required],
      RoleDescription: ["", Validators.required],
      RolePages: ["", Validators.required],
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
    this.FetchAllRoles();
  }

  RunMessageDialogue() {
    this.msgs = [];
    this.msgs.push({
      severity: "info",
      summary: "Notice:",
      detail: "This page is for setting up company roles and pages permission.",
    });
  }

  FetchAllRoles() {
    this.fetching = true;
    this.roleService.GetAllRoles().subscribe(
      async (data) => {
        this.allRoles = data.object as RoleVM[];
        this.fetching = false;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all roles at the moment.. Reason: [" +
            error.error.message +
            "]",
        });
        this.RunMessageDialogue();
        this.fetching = false;
      }
    );
  }

  CloseEditing() {
    this.editing = false;
    this.selectedPages = [];
    this.roleForm.reset();
  }

  CreateRole() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Creating Role...",
    });
    this.RunMessageDialogue();

    const postData: CreateRoleVM = {
      roleName: this.roleForm.get("RoleName").value,
      roleDescription: this.roleForm.get("RoleDescription").value,
      pages: this.selectedPages.map((x) => x.key),
    };

    this.roleService.CreateRole(postData).subscribe(
      async (data) => {
        this.messageService.add({
          severity: "success",
          summary: "Completed",
          detail: "Role Created Successfully...",
        });

        this.RunMessageDialogue();
        this.fetching = true;
        this.roleForm.reset();
        this.FetchAllRoles();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to create role  at the moment.. Reason: [" +
            error.error.message +
            "]",
        });
        this.RunMessageDialogue();
      }
    );
  }

  GetPageEnumValue(identifier: number) {
    if (identifier == PagesEnum.Dashboard) return "Dashboard";
    if (identifier == PagesEnum.Setup_Role) return "Setup Role";
    if (identifier == PagesEnum.Setup_Product) return "Setup Product";
    if (identifier == PagesEnum.Customer_Onboarding)
      return "Customer Onboarding";
    if (identifier == PagesEnum.Customer_Ordering) return "Customer Ordering";
    if (identifier == PagesEnum.Customer_Reporting) return "Customer Reporting";

    return "N/A";
  }

  GetRolePagesString(item: string[]): string {
    let strValue: string;
    item.forEach((pageEnumKey) => {
      strValue + this.GetPageEnumValue(+pageEnumKey) + ";";
    });
    return strValue;
  }

  UpdateRole() {}
}
