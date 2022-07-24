import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Message, ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { MeansOfIdentificationEnum } from "src/app/interfaces/customer";
import { ProductService } from "src/app/services/product.service";

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
  allCustomers: any[];
  selectedCustomers: any[];
  allMeansOfIdentification: {
    key: number;
    value: string;
  }[];
  theMeansOfIdentification: {
    key: number;
    value: string;
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
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
      { field: "identificationNo", header: "Identification Number" },
      { field: "address", header: "Address" },
      { field: "dateCreated", header: "Date Registered" },
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
  }

  RegisterCustomer() {}

  UpdateCustomer() {}
}
