import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  InventoryStoreItem,
  InventoryStoreSummaryVM,
} from "../interfaces/inventory-store-item";
import { ResultVM } from "../interfaces/main";

@Injectable({
  providedIn: "root",
})
export class InventoryStoreItemService {
  baseUrl = environment.BaseUrl + "InventoryStoreItem/";

  constructor(private http: HttpClient) {}

  GetInventoryStoreSummary(): Observable<ResultVM<InventoryStoreSummaryVM>> {
    return this.http.get<ResultVM<InventoryStoreSummaryVM>>(
      this.baseUrl + "GetInventoryStoreSummary"
    );
  }

  GetAllInventoryItemsInStore(): Observable<ResultVM<InventoryStoreItem[]>> {
    return this.http.get<ResultVM<InventoryStoreItem[]>>(
      this.baseUrl + "GetAllInventoryItemsInStore"
    );
  }
}
