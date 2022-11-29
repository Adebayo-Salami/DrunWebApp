import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  CustomerVM,
  RegisterCustomerVM,
  UpdateCustomerVM,
} from "../interfaces/customer";
import { ResultVM } from "../interfaces/main";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  baseUrl = environment.BaseUrl + "Customer/";

  constructor(private http: HttpClient) {}

  RegisterCustomer(data: RegisterCustomerVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(this.baseUrl + "RegisterCustomer", data);
  }

  GetAllCustomers(): Observable<ResultVM<CustomerVM[]>> {
    return this.http.get<ResultVM<CustomerVM[]>>(
      this.baseUrl + "GetAllCustomers"
    );
  }

  UpdateCustomer(id: number, data: UpdateCustomerVM): Observable<ResultVM> {
    return this.http.put<ResultVM>(this.baseUrl + "UpdateCustomer/" + id, data);
  }

  DeleteCustomer(id: number): Observable<ResultVM> {
    return this.http.delete<ResultVM>(this.baseUrl + "DeleteCustomer/" + id);
  }
}
