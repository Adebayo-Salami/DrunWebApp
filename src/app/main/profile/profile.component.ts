import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { EventInput } from "@fullcalendar/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  @ViewChild("formWrapper") public formWrapper: ElementRef;
  pageLoading: boolean;
  imageSrc: string = "assets/no-profile.png";
  ProfileForm: FormGroup;
  uploadingNewPicture: boolean;
  file: any;
  isEditing: boolean;
  displayLoading: boolean;
  hasPasswordSet: boolean;
  authUser: any;

  constructor(
    private fb: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.ProfileForm = fb.group({
      firstName: ["", [Validators.required]],
      lastName: [""],
      otherName: [""],
      codeName: [""],
      dateOfBirth: ["", [Validators.required]],
      email: ["", [Validators.required]],
      mobileNumber: ["", [Validators.required, Validators.minLength(11)]],
      altEmail: [""],
      altMobileNumber: [""],
      address: ["", [Validators.required]],
      linkedInHandle: [""],
      facebookHandle: [""],
      twitterHandle: [""],
      instagramHandle: [""],
      imageUrl: [""],
      staffId: ["0"],
      password: [""],
      confirmPassword: [""],
      currentPassword: [""],
    });
  }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        label: "Main",
        routerLink: ["/main"],
      },
      {
        label: "Profile",
        routerLink: ["/main/profile"],
      },
    ]);
  }

  checkMimeType = (event: EventInput): boolean => {
    const files = event.target.files[0];
    const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (!files) {
      this.messageService.add({
        severity: "error",
        summary: "Failed",
        detail: "Please select an Image file",
      });
      return false;
    }
    if (types.every((type) => files.type !== type)) {
      this.messageService.add({
        severity: "error",
        summary: "Failed",
        detail: "Image format not supported",
      });
      return false;
    }
    return true;
  };

  checkFileSize = (event: EventInput) => {
    const files = event.target.files[0];
    if (!files) return true;
    const size = 400000;
    if (files.size > size) {
      event.target.value = null;
      this.messageService.add({
        severity: "error",
        summary: "Failed",
        detail: "Image is too large, please pick a smaller file",
      });
      return false;
    }
    return true;
  };

  onFileSelect(event) {
    if (!this.checkMimeType(event) || !this.checkFileSize(event)) {
      return;
    }

    this.uploadingNewPicture = true;
    this.isEditing = true;
    this.ProfileForm.enable();
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.ProfileForm.patchValue({
          imageUrl: reader.result,
        });
      };
    }
  }

  async UpdateProfile() {}

  IfSame(string1: FormControl, string2: FormControl): boolean {
    if (
      string1.value == null ||
      string2.value == null ||
      string1.value.trim() === ""
    ) {
      return false;
    }
    return string1.value.toLowerCase() === string2.value.toLowerCase();
  }

  ToggleEdit() {
    this.isEditing = true;
    this.ProfileForm.enable();
  }
}
