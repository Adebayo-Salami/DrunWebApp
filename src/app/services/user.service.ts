import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultVM } from "../interfaces/main";
import { CreateUserVM, UpdateProfileVM } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl + "User/";

  constructor(private http: HttpClient) {}

  CreateAccount(data: CreateUserVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(this.baseUrl + "CreateAccount", data);
  }

  GetUserProfileInfo(id: number): Observable<ResultVM> {
    return this.http.get<ResultVM>(this.baseUrl + "GetUserProfileInfo/" + id);
  }

  Logout(id: number): Observable<ResultVM> {
    return this.http.put<ResultVM>(this.baseUrl + "Logout/" + id, null);
  }

  UpdateUserProfile(id: number, data: UpdateProfileVM): Observable<ResultVM> {
    return this.http.put<ResultVM>(this.baseUrl + "UpdateUserProfile/" + id, data);
  }
}
