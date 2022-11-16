import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  CreateInventoryItemVM,
  InventoryItem,
  UpdateInventoryItemVM,
} from "../interfaces/inventory-item";
import { ResultVM } from "../interfaces/main";

@Injectable({
  providedIn: "root",
})
export class InventoryItemService {
  baseUrl = environment.BaseUrl + "InventoryItem/";

  constructor(private http: HttpClient) {}

  CreateInventoryItem(data: CreateInventoryItemVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(this.baseUrl + "CreateInventoryItem", data);
  }

  GetAllInventoryItems(): Observable<ResultVM<InventoryItem[]>> {
    return this.http.get<ResultVM<InventoryItem[]>>(
      this.baseUrl + "GetAllInventoryItems"
    );
  }

  UpdateInventoryItem(
    id: number,
    data: UpdateInventoryItemVM
  ): Observable<ResultVM> {
    return this.http.put<ResultVM>(
      this.baseUrl + "UpdateInventoryItem/" + id,
      data
    );
  }

  DeleteInventoryItem(id: number): Observable<ResultVM> {
    return this.http.delete<ResultVM>(
      this.baseUrl + "DeleteInventoryItem/" + id
    );
  }
}
