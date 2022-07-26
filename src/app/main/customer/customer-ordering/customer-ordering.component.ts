import { ProductVM } from "./../../../interfaces/product";
import { CustomerVM } from "./../../../interfaces/customer";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Message, ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { CustomerService } from "src/app/services/customer.service";
import {
  PackSizeEnum,
  PaymentModeEnum,
} from "src/app/interfaces/customerorder";

@Component({
  selector: "app-customer-ordering",
  templateUrl: "./customer-ordering.component.html",
  styleUrls: ["./customer-ordering.component.scss"],
})
export class CustomerOrderingComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  msgs: Message[] = [];
  cols: any[];
  customerOrderForm: FormGroup;
  editing: boolean;
  fetching: boolean;
  allCustomerOrders: any[];
  allCustomers: CustomerVM[];
  theCustomer: CustomerVM;
  allProducts: ProductVM[];
  theProduct: ProductVM;
  allPackSizes: {
    key: number;
    value: string;
  }[];
  thePackSize: {
    key: number;
    value: string;
  };
  allPaymentModes: {
    key: number;
    value: string;
  }[];
  thePaymentModes: {
    key: number;
    value: string;
  };

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.customerOrderForm = fb.group({
      Customer: ["", Validators.required],
      Product: ["", Validators.required],
      Quantity: ["", Validators.required],
      PackSize: ["", Validators.required],
      UnitPrice: ["", Validators.required],
      AmountToPay: [""],
      PaymentMode: ["", Validators.required],
      AmountPaid: ["", Validators.required],
    });
  }

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
    ]);

    this.cols = [
      { field: "name", header: "Name" },
      { field: "mobile", header: "Mobile" },
      { field: "meansOfIdentification", header: "Means Of Identification" },
      { field: "identificationNo", header: "Identification Number" },
      { field: "address", header: "Address" },
      { field: "dateRegistered", header: "Date Registered" },
    ];

    this.allPackSizes = [
      {
        key: PackSizeEnum.One_Litre,
        value: "1 Litre(s)",
      },
      {
        key: PackSizeEnum.Four_Litre,
        value: "4 Litre(s)",
      },
      {
        key: PackSizeEnum.TwentyFive_Litre,
        value: "25 Litre(s)",
      },
      {
        key: PackSizeEnum.TwoHundred_Litre,
        value: "200 Litre(s)",
      },
    ];

    this.allPaymentModes = [
      {
        key: PaymentModeEnum.Cash,
        value: "Cash",
      },
      {
        key: PaymentModeEnum.Transfer,
        value: "Transfer",
      },
      {
        key: PaymentModeEnum.Card,
        value: "Card",
      },
    ];
  }

  CreateCustomerOrder() {}

  get Quantity(): number {
    let value = 0;
    if (this.customerOrderForm.get("Quantity").value)
      value = +this.customerOrderForm.get("Quantity").value;
    return value;
  }

  get UnitPrice(): number {
    let value = 0;
    if (this.customerOrderForm.get("UnitPrice").value)
      value = +this.customerOrderForm.get("UnitPrice").value;
    return value;
  }
}
