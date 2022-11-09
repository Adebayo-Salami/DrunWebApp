import { AuthService } from "./../services/auth.service";
import { Injectable } from "@angular/core";
import {
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpRequest,
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { ApiLoadingService } from "../services/api-loading.service";
import { catchError, map, tap } from "rxjs/operators";
// import { FireBaseAuthService } from "../services/fire-base-auth.service";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private logginInSubject = new BehaviorSubject<boolean>(false);
  loggingIn$ = this.logginInSubject.asObservable();

  constructor(
    private apiLoadingService: ApiLoadingService,
    private authService: AuthService,
    // private fireBaseAuthService: FireBaseAuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.token ?? "";
    const refreshToken = this.token ?? "";

    const headers = {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
      "xr-token": `${refreshToken}`,
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "Sat, 01 Jan 2000 00:00:00 GMT",
    };

    if (request.responseType === "json") {
      headers["Content-Type"] = "application/json";
    }

    request = request.clone({
      setHeaders: headers,
      responseType: "json",
    });

    if (this.toShowOverlay(request)) {
      Promise.resolve(null).then(() => this.apiLoadingService.show());
    }

    return next.handle(request).pipe(
      map((res) => {
        if (res instanceof HttpResponse) {
          //intercept here for response body in res.body
          var token = res.headers.get("x-Token");
          if (token) {
            // this.fireBaseAuthService.replaceToken(token);
          }
          this.apiLoadingService.hide();
        }

        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.messageService.add({
            severity: "error",
            summary: "Client-side Error",
            detail: `Error: ${error.error.message}`,
          });
        } else {
          if (error.status == 401) {
            this.logout();
          }
          if (error.status == 404) {
            //Not Found
          }

          if (error.status == 445) {
            //login again
            // this.fireBaseAuthService.logout();
          }
        }

        this.apiLoadingService.hide();
        // return throwError(errorMsg);
        return throwError(error);
      })
    );
  }

  async logout() {
    this.messageService.add({
      severity: "error",
      summary: "Client-side Error",
      detail: "Session Expired, Kindly login.",
    });

    this.logginInSubject.next(false);
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  toShowOverlay(request: HttpRequest<any>): boolean {
    const method = request.method;

    if (method === "GET") return false;
    if (method === "PUT" || method === "POST" || method === "DELETE")
      return true;

    const url = request.url.toLowerCase();

    if (url.indexOf("Auth/authenticate") !== -1) {
      return true;
    }

    return false;
  }

  get token() {
    return this.getSessionStorageItem("token");
  }

  getSessionStorageItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }
}
