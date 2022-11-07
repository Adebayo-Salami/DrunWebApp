import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultVM } from "../interfaces/main";
import { CreateProductVM, UpdateProductVM } from "../interfaces/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = environment.BaseUrl + "Product/";

  constructor(private http: HttpClient) {}

  CreateProduct(data: CreateProductVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(this.baseUrl + "CreateProduct", data);
  }

  GetAllProducts(): Observable<ResultVM> {
    return this.http.get<ResultVM>(this.baseUrl + "GetAllProducts");
  }

  UpdateProduct(id: number, data: UpdateProductVM): Observable<ResultVM> {
    return this.http.put<ResultVM>(this.baseUrl + "UpdateProduct/" + id, data);
  }

  DeleteProduct(id: number): Observable<ResultVM> {
    return this.http.delete<ResultVM>(this.baseUrl + "DeleteProduct/" + id);
  }
}
