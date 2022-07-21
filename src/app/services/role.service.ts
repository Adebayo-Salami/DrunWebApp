import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultVM } from "../interfaces/main";
import { CreateRoleVM } from "../interfaces/role";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  baseUrl = environment.baseUrl + "Role/";

  constructor(private http: HttpClient) {}

  CreateRole(data: CreateRoleVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(this.baseUrl + "createrole", data);
  }
}
