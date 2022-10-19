import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";

@Component({
  selector: "app-user-setup",
  templateUrl: "./user-setup.component.html",
  styleUrls: ["./user-setup.component.scss"],
})
export class UserSetupComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  userForm: FormGroup;
  allRoles: any[];
  theRole: any;
  editingUser: boolean;

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
  }

  CreateUser() {}

  UpdateUser() {}
}
