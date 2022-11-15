import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  ActOnInventoryItemRequestVM,
  ConfirmInventoryItemRequestVM,
  CreateInventoryItemRequestVM,
  InventoryItemRequest,
  UpdateInventoryItemRequestVM,
} from "../interfaces/inventory-operation";
import { ResultVM } from "../interfaces/main";

@Injectable({
  providedIn: "root",
})
export class InventoryOperationService {
  baseUrl = environment.BaseUrl + "InventoryOperation/";

  constructor(private http: HttpClient) {}

  GetAllPendingInventoryItemRequests(): Observable<
    ResultVM<InventoryItemRequest[]>
  > {
    return this.http.get<ResultVM<InventoryItemRequest[]>>(
      this.baseUrl + "GetAllPendingInventoryItemRequests"
    );
  }

  CreateInventoryItemRequest(
    data: CreateInventoryItemRequestVM
  ): Observable<ResultVM> {
    return this.http.post<ResultVM>(
      this.baseUrl + "CreateInventoryItemRequest",
      data
    );
  }

  UpdateInventoryItemRequest(
    id: number,
    data: UpdateInventoryItemRequestVM
  ): Observable<ResultVM> {
    return this.http.put<ResultVM>(
      this.baseUrl + "UpdateInventoryItemRequest/" + id,
      data
    );
  }

  SendInventoryItemRequestForApproval(id: number): Observable<ResultVM> {
    return this.http.get<ResultVM>(
      this.baseUrl + "SendInventoryItemRequestForApproval/" + id
    );
  }

  DeleteInventoryItemRequest(id: number): Observable<ResultVM> {
    return this.http.delete<ResultVM>(
      this.baseUrl + "DeleteInventoryItemRequest/" + id
    );
  }

  GetAllAwaitingApprovalInventoryItemRequests(): Observable<
    ResultVM<InventoryItemRequest[]>
  > {
    return this.http.get<ResultVM<InventoryItemRequest[]>>(
      this.baseUrl + "GetAllAwaitingApprovalInventoryItemRequests"
    );
  }

  ActOnInventoryItemRequest(
    data: ActOnInventoryItemRequestVM
  ): Observable<ResultVM> {
    return this.http.post<ResultVM>(
      this.baseUrl + "ActOnInventoryItemRequest",
      data
    );
  }

  GetApprovedInventoryItemRequests(
    inventoryItemId: number
  ): Observable<ResultVM<InventoryItemRequest[]>> {
    return this.http.get<ResultVM<InventoryItemRequest[]>>(
      this.baseUrl + "GetAllPendingInventoryItemRequests/" + inventoryItemId
    );
  }

  ConfirmInventoryItemRequest(
    data: ConfirmInventoryItemRequestVM
  ): Observable<ResultVM> {
    return this.http.post<ResultVM>(
      this.baseUrl + "ConfirmInventoryItemRequest",
      data
    );
  }
}
