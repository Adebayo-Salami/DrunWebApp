import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultVM } from "../interfaces/main";
import {
  CreateSupplierVM,
  ProductSupplier,
  UpdateSupplierVM,
} from "../interfaces/supplier";

@Injectable({
  providedIn: "root",
})
export class SupplierService {
  baseUrl = environment.BaseUrl + "Supplier/";

  constructor(private http: HttpClient) {}

  CreateSupplier(data: CreateSupplierVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(this.baseUrl + "CreateSupplier", data);
  }

  GetAllSupplier(): Observable<ResultVM<ProductSupplier[]>> {
    return this.http.get<ResultVM<ProductSupplier[]>>(
      this.baseUrl + "GetAllSupplier"
    );
  }

  UpdateSupplier(id: number, data: UpdateSupplierVM): Observable<ResultVM> {
    return this.http.put<ResultVM>(this.baseUrl + "UpdateSupplier/" + id, data);
  }

  DeleteSupplier(id: number): Observable<ResultVM> {
    return this.http.delete<ResultVM>(this.baseUrl + "DeleteSupplier/" + id);
  }
}
