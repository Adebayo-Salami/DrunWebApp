import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthenticateUserVM, AuthSessionVM } from "../interfaces/auth";
import { ResultVM } from "../interfaces/main";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = environment.BaseUrl + "Auth/";

  constructor(private http: HttpClient) {}

  Authenticate(data: AuthenticateUserVM): Observable<ResultVM<AuthSessionVM>> {
    data.companyId = environment.CompanyId;
    return this.http.post<ResultVM<AuthSessionVM>>(
      this.baseUrl + "Authenticate",
      data
    );
  }
}
