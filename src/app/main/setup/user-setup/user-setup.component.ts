import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, Message, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { RoleVM } from "src/app/interfaces/role";
import { CreateUserVM, User } from "src/app/interfaces/user";
import { RoleService } from "src/app/services/role.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user-setup",
  templateUrl: "./user-setup.component.html",
  styleUrls: ["./user-setup.component.scss"],
  providers: [MessageService],
})
export class UserSetupComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  userForm: FormGroup;
  allRoles: RoleVM[];
  theRole: RoleVM;
  editingUser: boolean;
  fetchingUsers: boolean;
  summaryMsg: Message[] = [];
  allUsers: User[] = [];
  fetchingUserCreationRequests: boolean;
  allUserCreationRequests: any[];
  selectedUserCreationRequests: any[];
  userRequestApprovalCols: any[];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    public userService: UserService,
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

    this.FetchAllRoles();
    this.FetchAllUsers();
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

  FetchAllUsers() {
    this.fetchingUsers = true;
    this.userService.GetAllUserAccounts().subscribe(
      async (data) => {
        if (data.isSuccessful) {
          this.allUsers = data.object;
          this.fetchingUsers = false;
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Notice",
            detail: data.message,
          });
          this.ResetMessageToasters();
          this.fetchingUsers = false;
        }
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to fetch all users at the moment.. Reason: [" +
            (error ? error.error.message : "request failed - permission") +
            "]",
        });
        this.fetchingUsers = false;
      }
    );
  }

  FetchAllRoles() {
    this.roleService.GetAllRoles().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          return;
        }
        this.allRoles = data.object;
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
        this.ResetMessageToasters();
      }
    );
  }

  CreateUser() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Creating new user account...",
    });
    this.ResetMessageToasters();

    const postData: CreateUserVM = {
      lastname: this.userForm.get("LastName").value,
      firstname: this.userForm.get("FirstName").value,
      othername: this.userForm.get("OtherName").value,
      codeName: this.userForm.get("CodeName").value,
      phoneNumber: this.userForm.get("Mobile").value,
      email: this.userForm.get("Email").value,
      defaultPassword: this.userForm.get("DefaultPassword").value,
      assignedRoleId: this.theRole.id,
      address: this.userForm.get("Address").value,
    };

    this.userService.CreateAccount(postData).subscribe(
      async (data) => {
        if (data.isSuccessful) {
          this.messageService.add({
            severity: "success",
            summary: "Completed",
            detail: "Account Created Successfully!",
          });
          this.ResetMessageToasters();
          this.FetchAllUsers();
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Notice",
            detail: data.message,
          });
          this.ResetMessageToasters();
        }
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to create benefit at the moment.. Reason: [" +
            (error ? error.error.message : "request failed - permission") +
            "]",
        });
        this.ResetMessageToasters();
      }
    );
  }

  UpdateUser() {}

  GetUserFullName(userId): string {
    let user = this.allUsers.find((x) => x.id == userId);
    if (user) return user.lastname + " " + user.firstname;
    return "System";
  }

  SwitchUserStatus(item: any) {}

  EditUser(item: any) {}

  DeleteUser(item: any) {}

  ActOnUserCreationRequest(item: any, approved: boolean) {}
}
