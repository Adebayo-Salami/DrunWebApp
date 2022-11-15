import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  CreateInventoryApprovingOfficerVM,
  InventoryApprovingOfficer,
} from "../interfaces/inventory-approving-officer";
import { ResultVM } from "../interfaces/main";

@Injectable({
  providedIn: "root",
})
export class InventoryApprovingOfficerService {
  baseUrl = environment.BaseUrl + "InventoryApprovingOfficer/";

  constructor(private http: HttpClient) {}

  CreateInventoryApprovingOfficer(
    data: CreateInventoryApprovingOfficerVM
  ): Observable<ResultVM> {
    return this.http.post<ResultVM>(
      this.baseUrl + "CreateInventoryApprovingOfficer",
      data
    );
  }

  GetAllInventoryApprovingOfficers(): Observable<
    ResultVM<InventoryApprovingOfficer>
  > {
    return this.http.get<ResultVM<InventoryApprovingOfficer>>(
      this.baseUrl + "GetAllInventoryApprovingOfficers"
    );
  }

  DeleteInventoryApprovingOfficer(id: number): Observable<ResultVM> {
    return this.http.delete<ResultVM>(
      this.baseUrl + "DeleteInventoryApprovingOfficer/" + id
    );
  }
}
