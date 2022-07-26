import { RoleService } from "./../../../services/role.service";
import { PagesEnum } from "./../../../interfaces/main";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MessageService, Message, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { CreateRoleVM, RoleVM, UpdateRoleVM } from "src/app/interfaces/role";

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
  selectedRoles: RoleVM[];
  roleToEdit: RoleVM;

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
        key: PagesEnum.Customer_Ordering_CreateOrder,
        value: "Customer Ordering (Create Order)",
      },
      {
        key: PagesEnum.Customer_Ordering_ApproveOrder,
        value: "Customer Ordering (Approve Order)",
      },
      {
        key: PagesEnum.Customer_Ordering_ViewOrders,
        value: "Customer Ordering (View Orders)",
      },
      {
        key: PagesEnum.Customer_Reporting_CustomersVolume,
        value: "Customer Reporting (Customers Volume)",
      },
      {
        key: PagesEnum.Customer_Reporting_DebtAgeAnalysis,
        value: "Customer Reporting (Debt Age Analysis)",
      },
      {
        key: PagesEnum.Customer_Reporting_ProductMix,
        value: "Customer Reporting (Product Mix)",
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
            error.message +
            "]",
        });
        this.RunMessageDialogue();
        this.fetching = false;
      }
    );
  }

  CloseEditing() {
    this.editing = false;
    this.roleToEdit = null;
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
            error.message +
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
    if (identifier == PagesEnum.Customer_Ordering_CreateOrder)
      return "Customer Ordering (Create Order)";
    if (identifier == PagesEnum.Customer_Ordering_ViewOrders)
      return "Customer Ordering (View Orders)";
    if (identifier == PagesEnum.Customer_Reporting_CustomersVolume)
      return "Customer Reporting (Customers Volume)";
    if (identifier == PagesEnum.Customer_Reporting_DebtAgeAnalysis)
      return "Customer Reporting (Debt Age Analysis)";
    if (identifier == PagesEnum.Customer_Reporting_ProductMix)
      return "Customer Reporting (Product Mix)";

    return "N/A";
  }

  GetRolePagesString(item: string[]): string {
    let strValue: string = "";
    item.forEach((pageEnumKey) => {
      if (pageEnumKey) {
        strValue = strValue + this.GetPageEnumValue(+pageEnumKey) + ";";
      }
    });
    return strValue;
  }

  EditRole(item: RoleVM) {
    this.editing = true;
    this.roleForm.addControl(
      "ID",
      new FormControl({ value: "", disabled: true }, Validators.required)
    );
    this.roleToEdit = item;
    this.roleForm.patchValue({
      ID: item.id,
      RoleName: item.roleName,
      RoleDescription: item.roleDescription,
    });
    this.selectedPages = this.allPages.filter((x) =>
      item.rolePages.find((y) => +y == x.key)
    );

    this.formWrapper.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  }

  UpdateRole() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Updating Role...",
    });
    this.RunMessageDialogue();

    const id = this.roleToEdit.id;
    const postData: UpdateRoleVM = {
      roleName: this.roleForm.get("RoleName").value,
      roleDescription: this.roleForm.get("RoleDescription").value,
      pages: this.selectedPages.map((x) => x.key),
    };

    this.roleService.UpdateRole(id, postData).subscribe(
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
        this.RunMessageDialogue();
        this.fetching = true;
        this.CloseEditing();
        this.FetchAllRoles();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to update role at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.RunMessageDialogue();
      }
    );
  }

  DeleteRole(item: RoleVM) {
    this.confirmationService.confirm({
      message: "Are you sure you want to remove role?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Removing role...",
        });
        this.RunMessageDialogue();

        this.roleService.DeleteRole(item.id).subscribe(
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
            this.RunMessageDialogue();

            this.fetching = true;
            const index = this.allRoles.indexOf(item);
            if (index > -1) {
              this.allRoles.splice(index, 1);
            }
            this.fetching = false;
          },
          (error) => {
            console.log("Error: " + JSON.stringify(error));
            this.messageService.add({
              severity: "error",
              summary: "Notice",
              detail:
                "Unable to remove role at the moment.. Reason: [" +
                error.message +
                "]",
            });
            this.RunMessageDialogue();
          }
        );
      },
    });
  }
}
