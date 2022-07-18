import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthenticateUserVM } from "../interfaces/auth";
import { ResultVM } from "../interfaces/main";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = environment.baseUrl + "Auth/";

  constructor(private http: HttpClient) {}

  Authenticate(data: AuthenticateUserVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(this.baseUrl + "authenticate", data);
  }
}
