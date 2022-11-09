import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, Message, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { Role } from "src/app/interfaces/role";
import { CreateUserVM, UpdateProfileVM, User } from "src/app/interfaces/user";
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
  allRoles: Role[];
  theRole: Role;
  editingUser: boolean;
  fetchingUsers: boolean;
  summaryMsg: Message[] = [];
  allUsers: User[] = [];
  allUserCreationRequests: User[];
  selectedUserCreationRequests: User[];
  userRequestApprovalCols: any[];
  userToEdit: User;

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
          this.allUserCreationRequests = this.allUsers.filter(
            (x) => x.isApproved == false
          );
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

  UpdateUser() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Updating User...",
    });
    this.ResetMessageToasters();

    const id = this.userToEdit.id;
    const postData: UpdateProfileVM = {
      lastName: this.userForm.get("LastName").value,
      firstName: this.userForm.get("FirstName").value,
      othername: this.userForm.get("OtherName").value,
      codeName: this.userForm.get("CodeName").value,
      mobile: this.userForm.get("Mobile").value,
      address: this.userForm.get("Address").value,
    };
    postData.roleIds = [this.theRole.id];

    this.userService.UpdateUserProfile(id, postData).subscribe(
      async (data) => {
        if (data.isSuccessful) {
          this.messageService.add({
            severity: "success",
            summary: "Completed",
            detail: "Account Updated Successfully!",
          });
          this.CloseEditing();
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
            "Unable to update user profile at the moment.. Reason: [" +
            (error ? error.error.message : "request failed - permission") +
            "]",
        });
        this.ResetMessageToasters();
      }
    );
  }

  GetUserFullName(userId): string {
    let user = this.allUsers.find((x) => x.id == userId);
    if (user) return user.lastname + " " + user.firstname;
    return "System";
  }

  SwitchUserStatus(item: User) {
    this.confirmationService.confirm({
      message: item.isDeactivated
        ? "Activated users can access the system. Do you still wish to proceed?"
        : "Deactivated users can't access the system. Are you sure you want to deactivate this user account?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: item.isDeactivated
            ? "Activating user account..."
            : "Deactivating user account...",
        });
        this.ResetMessageToasters();

        this.userService.SwitchUserAccountStatus(item.id).subscribe(
          async (data) => {
            if (data.isSuccessful) {
              this.messageService.add({
                severity: "success",
                summary: "Completed",
                detail: item.isDeactivated
                  ? "Account Activated Successfully!"
                  : "Account Deactivated Successfully!",
              });
              this.CloseEditing();
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
                "Unable to perform action on user account at the moment.. Reason: [" +
                error
                  ? error.error.message
                  : "request failed - permission" + "]",
            });
            this.ResetMessageToasters();
          }
        );
      },
    });
  }

  EditUser(item: User) {
    this.editingUser = true;
    this.userForm.patchValue({
      LastName: item.lastname,
      FirstName: item.firstname,
      OtherName: item.othername,
      CodeName: item.othername,
      Mobile: item.mobile,
      Email: item.email,
      Address: item.address,
      DefaultPassword: "XXXXXXXXXX",
    });
    if (item.userRoles.length > 0)
      this.theRole = this.allRoles.find(
        (x) => (x.id = item.userRoles[0].roleId)
      );
    this.userToEdit = item;

    this.formWrapper.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  }

  CloseEditing() {
    this.editingUser = false;
    this.userToEdit = null;
    this.theRole = null;
    this.userForm.reset();
  }

  DeleteUser(item: User) {}

  ActOnUserCreationRequest(item: User, approved: boolean) {
    this.confirmationService.confirm({
      message: approved
        ? "You are about to approve this user account request and give user access to the system. Do you still wish to proceed?"
        : "You are about to decline this user account request and remove request from the system. Do you still wish to proceed?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: approved
            ? "Approving user account request..."
            : "Declining user account request...",
        });
        this.ResetMessageToasters();

        this.userService
          .ActOnUserAccountCreationRequest(item.id, item.role.id, approved)
          .subscribe(
            async (data) => {
              if (data.isSuccessful) {
                this.messageService.add({
                  severity: "success",
                  summary: "Completed",
                  detail: approved
                    ? "Account Request Approved Successfully!"
                    : "Account Request Declined Successfully!",
                });
                this.CloseEditing();
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
                  "Unable to perform action on user account request at the moment.. Reason: [" +
                  error
                    ? error.error.message
                    : "request failed - permission" + "]",
              });
              this.ResetMessageToasters();
            }
          );
      },
    });
  }
}
