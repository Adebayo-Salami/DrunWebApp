import {
  ActOnBatchApprovalVM,
  CreateCustomerOrderVM,
  CustomerOrderBatchVM,
  LogCustomerOrderBatchVM,
  UpdateCustomerOrderVM,
} from "./../interfaces/customerorder";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultVM } from "../interfaces/main";

@Injectable({
  providedIn: "root",
})
export class CustomerOrderService {
  baseUrl = environment.BaseUrl + "CustomerOrder/";

  constructor(private http: HttpClient) {}

  CreateCustomerOrder(data: CreateCustomerOrderVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(this.baseUrl + "CreateCustomerOrder", data);
  }

  GetOngoingBatch(): Observable<ResultVM> {
    return this.http.get<ResultVM>(this.baseUrl + "GetOngoingBatch");
  }

  UpdateCustomerOrder(
    id: number,
    data: UpdateCustomerOrderVM
  ): Observable<ResultVM> {
    return this.http.put<ResultVM>(
      this.baseUrl + "UpdateCustomerOrder/" + id,
      data
    );
  }

  DeleteCustomerOrder(id: number): Observable<ResultVM> {
    return this.http.delete<ResultVM>(
      this.baseUrl + "DeleteCustomerOrder/" + id
    );
  }

  LogCustomerOrderBatch(data: LogCustomerOrderBatchVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(
      this.baseUrl + "LogCustomerOrderBatch",
      data
    );
  }

  GetAllBatchPendingApproval(): Observable<ResultVM<CustomerOrderBatchVM[]>> {
    return this.http.get<ResultVM<CustomerOrderBatchVM[]>>(
      this.baseUrl + "GetAllBatchPendingApproval"
    );
  }

  ActOnBatchApproval(data: ActOnBatchApprovalVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(this.baseUrl + "ActOnBatchApproval", data);
  }

  GetAllBatchPendingConfirmation(): Observable<
    ResultVM<CustomerOrderBatchVM[]>
  > {
    return this.http.get<ResultVM<CustomerOrderBatchVM[]>>(
      this.baseUrl + "GetAllBatchPendingConfirmation"
    );
  }
}
