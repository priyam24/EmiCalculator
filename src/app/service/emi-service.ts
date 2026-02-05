import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmiCalculationRequest } from '../model/EmiCalculationRequest';
import { EmiCalculationResponse } from '../model/EmiCalculationResponse';

@Injectable({
  providedIn: 'root'
})
export class EmiService {

  private readonly API_URL = 'http://localhost:8080/api/loan/emi';

  constructor(private http: HttpClient) {}

  calculateEmi(payload: EmiCalculationRequest): Observable<EmiCalculationResponse> {
    return this.http.post<EmiCalculationResponse>(this.API_URL, payload);
  }
}
