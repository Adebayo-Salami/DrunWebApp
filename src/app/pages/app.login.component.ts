import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthenticateUserVM, AuthSessionVM } from "../interfaces/auth";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { AngularFireAuth } from "@angular/fire/auth";
import { Idle } from "@ng-idle/core";

@Component({
  selector: "app-login",
  providers: [MessageService],
  templateUrl: "./app.login.component.html",
})
export class AppLoginComponent implements OnInit {
  checked: boolean;
  loginForm: FormGroup;
  dark: true;

  private logginInSubject = new BehaviorSubject<boolean>(false);
  loggingIn$ = this.logginInSubject.asObservable();

  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    public idle: Idle,
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

    const postData: AuthenticateUserVM = {
      username: email,
      password: password,
    };

    this.authService.Authenticate(postData).subscribe(
      async (res) => {
        if (res.isSuccessful) {
          this.logginInSubject.next(true);

          var data = res.object as AuthSessionVM;

          const token = data.token;
          const userProfile = data.userProfile;
          const refreshToken = data.token;
          const roles = [];

          this.setSessionStorageItem("token", token);
          this.setSessionStorageItem("userProfile", userProfile);
          this.setSessionStorageItem("refresh-token", refreshToken);
          this.setSessionStorageItem("userRoles", roles);

          await this.goHome();
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Login failure",
            detail: res.message,
          });
        }
      },
      (error) => {
        console.log(JSON.stringify(error));
        this.messageService.add({
          severity: "error",
          summary: "Authentication Error",
          detail: "Invalid email or password",
        });
      }
    );
  }

  goHome() {
    this.logginInSubject.next(false);
    this.messageService.add({
      severity: "success",
      summary: "Authentication Pass",
      detail: "You successfully Login, wait while we redirect your connection",
    });
    return this.router.navigate(["/main/profile"]);
  }

  get isLoggedIn(): boolean {
    return this.token !== null && this.authUserProfile !== null;
  }

  get token() {
    return this.getSessionStorageItem("token");
  }

  get refreshToken() {
    return this.getSessionStorageItem("refresh-token");
  }

  get authUserProfile() {
    return this.getSessionStorageItem("userProfile");
  }

  get authUserRoles() {
    return this.getSessionStorageItem("userRoles");
  }

  getSessionStorageItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  setSessionStorageItem(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  removeAllLocalStorageItems() {
    sessionStorage.clear();
  }
}
