import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Message, ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import {
  CustomerVM,
  MeansOfIdentificationEnum,
  RegisterCustomerVM,
  UpdateCustomerVM,
} from "src/app/interfaces/customer";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-customer-onboarding",
  templateUrl: "./customer-onboarding.component.html",
  styleUrls: ["./customer-onboarding.component.scss"],
})
export class CustomerOnboardingComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  msgs: Message[] = [];
  cols: any[];
  customerForm: FormGroup;
  editing: boolean;
  fetching: boolean;
  allCustomers: CustomerVM[];
  selectedCustomers: CustomerVM[];
  allMeansOfIdentification: {
    key: number;
    value: string;
  }[];
  theMeansOfIdentification: {
    key: number;
    value: string;
  };
  customerToEdit: CustomerVM;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.customerForm = fb.group({
      Name: ["", Validators.required],
      Address: ["", Validators.required],
      MID: ["", Validators.required],
      Identification: ["", Validators.required],
      Mobile: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        label: "Cutomer Service",
        routerLink: ["/main/customer"],
      },
      {
        label: "Onboarding",
        routerLink: ["/main/customer/onboarding"],
      },
    ]);

    this.cols = [
      { field: "name", header: "Name" },
      { field: "mobile", header: "Mobile" },
      { field: "meansOfIdentification", header: "Means Of Identification" },
      { field: "identificationNo", header: "Identification Number" },
      { field: "address", header: "Address" },
      { field: "dateRegistered", header: "Date Registered" },
    ];

    this.allMeansOfIdentification = [
      {
        key: MeansOfIdentificationEnum.NIN,
        value: "NIN",
      },
      {
        key: MeansOfIdentificationEnum.BVN,
        value: "BVN",
      },
      {
        key: MeansOfIdentificationEnum.Drivers_License,
        value: "Drivers License",
      },
      {
        key: MeansOfIdentificationEnum.Voters_Card,
        value: "Voters Card",
      },
    ];

    this.RunMessageDialogue();
    this.FetchAllCustomers();
  }

  RunMessageDialogue() {
    this.msgs = [];
    this.msgs.push({
      severity: "info",
      summary: "Notice:",
      detail: "This page is for onboarding new customers.",
    });
  }

  FetchAllCustomers() {
    this.fetching = true;
    this.customerService.GetAllCustomers().subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          this.fetching = false;
          return;
        }
        this.allCustomers = data.object as CustomerVM[];
        this.fetching = false;
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to get all customers at the moment.. Reason: [" +
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
    this.customerToEdit = null;
    this.customerForm.reset();
  }

  RegisterCustomer() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Registering Customer...",
    });
    this.RunMessageDialogue();

    const postData: RegisterCustomerVM = {
      name: this.customerForm.get("Name").value,
      mobile: this.customerForm.get("Mobile").value,
      meansOfIdentification: this.theMeansOfIdentification.key,
      identificationNumber: this.customerForm.get("Identification").value + "",
      address: this.customerForm.get("Address").value,
    };

    this.customerService.RegisterCustomer(postData).subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
          return;
        }

        this.messageService.add({
          severity: "success",
          summary: "Completed",
          detail: "Customer Registered Successfully...",
        });

        this.RunMessageDialogue();
        this.fetching = true;
        this.customerForm.reset();
        this.FetchAllCustomers();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to create customer at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.RunMessageDialogue();
      }
    );
  }

  EditCustomer(item: CustomerVM) {
    this.editing = true;
    this.customerForm.addControl(
      "ID",
      new FormControl({ value: "", disabled: true }, Validators.required)
    );
    this.customerToEdit = item;
    this.theMeansOfIdentification = this.allMeansOfIdentification.find(
      (x) => x.key == item.meansOfIdentification
    );
    this.customerForm.patchValue({
      ID: item.id,
      Name: item.name,
      Mobile: item.mobile,
      Identification: item.identificationNo,
      Address: item.address,
    });

    this.formWrapper.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  }

  UpdateCustomer() {
    this.messageService.add({
      severity: "info",
      summary: "Notice",
      detail: "Updating Customer...",
    });
    this.RunMessageDialogue();

    const id = this.customerToEdit.id;
    const postData: UpdateCustomerVM = {
      name: this.customerForm.get("Name").value,
      mobile: this.customerForm.get("Mobile").value,
      meansOfIdentification: this.theMeansOfIdentification.key,
      identificationNumber: this.customerForm.get("Identification").value + "",
      address: this.customerForm.get("Address").value,
    };

    this.customerService.UpdateCustomer(id, postData).subscribe(
      async (data) => {
        if (!data.isSuccessful) {
          this.messageService.add({
            severity: "error",
            summary: "Failure",
            detail: data.message,
          });
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
        this.FetchAllCustomers();
      },
      (error) => {
        console.log("Error: " + JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Notice",
          detail:
            "Unable to update customer at the moment.. Reason: [" +
            error.message +
            "]",
        });
        this.RunMessageDialogue();
      }
    );
  }

  DeleteCustomer(item: CustomerVM) {
    this.confirmationService.confirm({
      message: "Are you sure you want to remove customer?",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Notice",
          detail: "Removing customer...",
        });
        this.RunMessageDialogue();

        this.customerService.DeleteCustomer(item.id).subscribe(
          async (data) => {
            if (!data.isSuccessful) {
              this.messageService.add({
                severity: "error",
                summary: "Failure",
                detail: data.message,
              });
              return;
            }

            this.messageService.add({
              severity: "success",
              summary: "Removed",
              detail: "Removed successfully",
            });
            this.RunMessageDialogue();

            this.fetching = true;
            const index = this.allCustomers.indexOf(item);
            if (index > -1) {
              this.allCustomers.splice(index, 1);
            }
            this.fetching = false;
          },
          (error) => {
            console.log("Error: " + JSON.stringify(error));
            this.messageService.add({
              severity: "error",
              summary: "Notice",
              detail:
                "Unable to remove customer at the moment.. Reason: [" +
                error.message +
                "]",
            });
            this.RunMessageDialogue();
          }
        );
      },
    });
  }

  GetMeansOfIdentificationString(identifier: number): string {
    if (identifier == MeansOfIdentificationEnum.NIN) return "NIN";
    if (identifier == MeansOfIdentificationEnum.BVN) return "BVN";
    if (identifier == MeansOfIdentificationEnum.Drivers_License)
      return "Drivers License";
    if (identifier == MeansOfIdentificationEnum.Voters_Card)
      return "Voters Card";

    return "N/A";
  }
}
