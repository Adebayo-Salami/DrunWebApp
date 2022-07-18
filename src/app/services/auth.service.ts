import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthenticateUserVM } from "../interfaces/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = environment.baseUrl + "Auth/";

  constructor(private http: HttpClient) {}

  Authenticate(data: AuthenticateUserVM): Observable<any> {
    return this.http.post<any>(this.baseUrl + "authenticate", data);
  }
}
