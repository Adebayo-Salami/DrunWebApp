import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultVM } from "../interfaces/main";
import {
  ActOnUserAccountRequestVM,
  CreateUserVM,
  UpdateProfileVM,
  User,
} from "../interfaces/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = environment.BaseUrl + "User/";

  constructor(private http: HttpClient) {}

  GetAllUserAccounts(): Observable<ResultVM<User[]>> {
    return this.http.get<ResultVM<User[]>>(this.baseUrl + "GetAllUserAccounts");
  }

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
    return this.http.put<ResultVM>(
      this.baseUrl + "UpdateUserProfile/" + id,
      data
    );
  }

  SwitchUserAccountStatus(id: number): Observable<ResultVM> {
    return this.http.patch<ResultVM>(
      this.baseUrl + "SwitchUserAccountStatus/" + id,
      null
    );
  }

  ActOnUserAccountCreationRequest(
    data: ActOnUserAccountRequestVM
  ): Observable<ResultVM> {
    return this.http.post<ResultVM>(
      this.baseUrl + "ActOnUserAccountCreationRequest",
      data
    );
  }
}
