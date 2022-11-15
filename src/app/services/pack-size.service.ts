import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultVM } from "../interfaces/main";
import {
  CreatePackSizeVM,
  PackSize,
  UpdatePackSizeVM,
} from "../interfaces/pack-size";

@Injectable({
  providedIn: "root",
})
export class PackSizeService {
  baseUrl = environment.BaseUrl + "PackSize/";

  constructor(private http: HttpClient) {}

  CreatePackSize(data: CreatePackSizeVM): Observable<ResultVM> {
    return this.http.post<ResultVM>(this.baseUrl + "CreatePackSize", data);
  }

  GetAllPackSizes(): Observable<ResultVM<PackSize[]>> {
    return this.http.get<ResultVM<PackSize[]>>(
      this.baseUrl + "GetAllPackSizes"
    );
  }

  UpdatePackSize(id: number, data: UpdatePackSizeVM): Observable<ResultVM> {
    return this.http.put<ResultVM>(this.baseUrl + "UpdatePackSize/" + id, data);
  }

  DeletePackSize(id: number): Observable<ResultVM> {
    return this.http.delete<ResultVM>(this.baseUrl + "DeletePackSize/" + id);
  }
}
