import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";

@Component({
  selector: "app-inventory-item-request",
  templateUrl: "./inventory-item-request.component.html",
  styleUrls: ["./inventory-item-request.component.scss"],
})
export class InventoryItemRequestComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  requestForm: FormGroup;
  allInventoryItems: any[];
  theInventoryItem: any;
  selectedInventoryRawItems: any[] = [];

  constructor(
    fb: FormBuilder,
    public messageService: MessageService,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService
  ) {
    this.requestForm = fb.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      Quantity: ["", Validators.required],
      Item: ["", Validators.required],
      BasePrice: [""],
    });
  }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        label: "Inventory",
        routerLink: ["/main/inventory"],
      },
      {
        label: "Item Request",
        routerLink: ["/main/inventory/item-request"],
      },
    ]);
  }

  // Check User Reuuesyt
  //INCLUDE INVENTORY CONFIRMATION IN
  CreateInventoryRequest() {}
}
