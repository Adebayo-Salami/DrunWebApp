import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-login",
  providers: [MessageService],
  templateUrl: "./app.login.component.html",
})
export class AppLoginComponent implements OnInit {
  checked: boolean;
  loginForm: FormGroup;
  dark: true;

  constructor(
    // private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder // private fireBaseAuthService: FireBaseAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: [""],
      remember: [null],
    });
  }

  async login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    // this.userService.authenticateOtherUser(email, password).subscribe(
    //   async (res) => {
    //     if (res.responseCode == "00") {
    //       var data = res.responseData;
    //       this.fireBaseAuthService.grantSessionBasicSiginin(data);
    //     } else {
    //       this.messageService.add({
    //         severity: "error",
    //         summary: "Login failure",
    //         detail: res.responseMsg,
    //       });
    //     }
    //   },
    //   (error) => {
    //     this.messageService.add({
    //       severity: "error",
    //       summary: "Authentication Error",
    //       detail: "Invalid email or password",
    //     });
    //   }
    // );
  }
}
