import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultVM } from "../interfaces/main";
import { CreateRoleVM, Role, UpdateRoleVM } from "../interfaces/role";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  baseUrl = environment.BaseUrl + "Role/";

  constructor(private http: HttpClient) {}

  CreateRole(data: CreateRoleVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(this.baseUrl + "CreateRole", data);
  }

  GetAllRoles(): Observable<ResultVM<Role[]>> {
    return this.http.get<ResultVM<RoleVM[]>>(this.baseUrl + "GetAllRoles");
  }

  UpdateRole(id: number, data: UpdateRoleVM): Observable<ResultVM> {
    return this.http.put<ResultVM>(this.baseUrl + "UpdateRole/" + id, data);
  }

  DeleteRole(id: number): Observable<ResultVM> {
    return this.http.delete<ResultVM>(this.baseUrl + "DeleteRole/" + id);
  }
}
