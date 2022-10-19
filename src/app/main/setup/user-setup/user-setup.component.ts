import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, Message, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";

@Component({
  selector: "app-user-setup",
  templateUrl: "./user-setup.component.html",
  styleUrls: ["./user-setup.component.scss"],
  providers: [MessageService],
})
export class UserSetupComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  userForm: FormGroup;
  allRoles: any[];
  theRole: any;
  editingUser: boolean;
  fetchingUsers: boolean;
  summaryMsg: Message[] = [];
  allUsers: any[] = [];
  fetchingUserCreationRequests: boolean;
  allUserCreationRequests: any[];
  selectedUserCreationRequests: any[];
  userRequestApprovalCols: any[];

  constructor(
    private fb: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.userForm = fb.group({
      LastName: ["", Validators.required],
      FirstName: ["", Validators.required],
      OtherName: [""],
      CodeName: [""],
      Mobile: ["", Validators.required],
      Email: [""],
      Address: [""],
      DefaultPassword: ["", Validators.required],
      AssignedRole: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        label: "Setup",
        routerLink: ["/main/setup"],
      },
      {
        label: "User",
        routerLink: ["/main/setup/user"],
      },
    ]);

    this.userRequestApprovalCols = [
      { field: "email", header: "Email" },
      { field: "dateRegistered", header: "Date Registered" },
    ];

    this.ResetMessageToasters();
  }

  ResetMessageToasters() {
    this.summaryMsg = [];
    this.summaryMsg.push({
      severity: "info",
      summary: "Notice:",
      detail:
        "There are currently " +
        this.allUsers.length +
        " users onboarded on the system.",
    });
  }

  CreateUser() {}

  UpdateUser() {}

  GetUserFullName(userId): string {
    return "N/A";
  }

  SwitchUserStatus(item: any) {}

  EditUser(item: any) {}

  DeleteUser(item: any) {}

  ActOnUserCreationRequest(item: any, approved: boolean) {}
}
