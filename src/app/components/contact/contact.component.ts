import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Contact } from "src/app/interfaces/main";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  @Input() formData: Contact;
  editingContact: any;
  contactForm: FormGroup;
  @Output() leadPrimaryContactForm: any;
  @Output() onSubmit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  createContact() {}
}
