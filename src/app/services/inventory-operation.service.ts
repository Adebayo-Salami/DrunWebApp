import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { InventoryItemRequest } from "../interfaces/inventory-operation";
import { ResultVM } from "../interfaces/main";

@Injectable({
  providedIn: "root",
})
export class InventoryOperationService {
  baseUrl = environment.BaseUrl + "InventoryOperation/";

  constructor(private http: HttpClient) {}

  GetAllPendingInventoryItemRequests(): Observable<
    ResultVM<InventoryItemRequest>
  > {
    return this.http.get<ResultVM<InventoryItemRequest>>(
      this.baseUrl + "GetAllPendingInventoryItemRequests"
    );
  }
}
