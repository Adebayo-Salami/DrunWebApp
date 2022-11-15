import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultVM } from "../interfaces/main";

@Injectable({
  providedIn: "root",
})
export class InventoryStoreItemService {
  baseUrl = environment.BaseUrl + "InventoryStoreItem/";

  constructor(private http: HttpClient) {}
}
